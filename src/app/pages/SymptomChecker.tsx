import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { detectDisease, saveDiagnosis, Symptom } from '../utils/diseaseDetector';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Plus, X, Stethoscope } from 'lucide-react';
import { toast } from 'sonner';

export function SymptomChecker() {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [currentSeverity, setCurrentSeverity] = useState<'mild' | 'moderate' | 'severe'>('mild');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const addSymptom = () => {
    if (!currentSymptom.trim()) {
      toast.error('Please enter a symptom');
      return;
    }

    const newSymptom: Symptom = {
      id: Date.now().toString(),
      name: currentSymptom.trim(),
      severity: currentSeverity
    };

    setSymptoms([...symptoms, newSymptom]);
    setCurrentSymptom('');
    setCurrentSeverity('mild');
    toast.success('Symptom added');
  };

  const removeSymptom = (id: string) => {
    setSymptoms(symptoms.filter(s => s.id !== id));
  };

  const handleAnalyze = () => {
    if (symptoms.length === 0) {
      toast.error('Please add at least one symptom');
      return;
    }

    setLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const results = detectDisease(symptoms);
      
      if (results.length === 0) {
        toast.error('No matching conditions found. Please consult a doctor.');
        setLoading(false);
        return;
      }

      // Save the top result to medical history
      if (user) {
        saveDiagnosis(user.id, results[0]);
      }

      // Navigate to results page with diagnosis data
      navigate('/results/latest', { state: { results, symptoms } });
      setLoading(false);
    }, 2000);
  };

  const commonSymptoms = [
    'Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea', 'Dizziness',
    'Sore throat', 'Runny nose', 'Body aches', 'Chills', 'Vomiting',
    'Diarrhea', 'Shortness of breath', 'Chest pain'
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Symptom Checker 🔍</h1>
          <p className="text-gray-600">
            Enter your symptoms to get AI-powered health insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Add Symptoms</CardTitle>
              <CardDescription>
                Describe what you're experiencing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="symptom">Symptom</Label>
                <Input
                  id="symptom"
                  placeholder="e.g., headache, fever"
                  value={currentSymptom}
                  onChange={(e) => setCurrentSymptom(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSymptom()}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity">Severity</Label>
                <Select
                  value={currentSeverity}
                  onValueChange={(value: any) => setCurrentSeverity(value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mild">Mild</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="severe">Severe</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={addSymptom} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Symptom
              </Button>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 mb-3">Common symptoms:</p>
                <div className="flex flex-wrap gap-2">
                  {commonSymptoms.slice(0, 6).map((symptom) => (
                    <button
                      key={symptom}
                      onClick={() => setCurrentSymptom(symptom)}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors"
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Symptoms */}
          <Card>
            <CardHeader>
              <CardTitle>Your Symptoms ({symptoms.length})</CardTitle>
              <CardDescription>
                Review and manage your symptoms
              </CardDescription>
            </CardHeader>
            <CardContent>
              {symptoms.length > 0 ? (
                <div className="space-y-2 mb-4">
                  {symptoms.map((symptom) => (
                    <div
                      key={symptom.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="capitalize">{symptom.name}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          symptom.severity === 'severe' ? 'bg-red-100 text-red-700' :
                          symptom.severity === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {symptom.severity}
                        </span>
                      </div>
                      <button
                        onClick={() => removeSymptom(symptom.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No symptoms added yet</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Start by adding your symptoms above
                  </p>
                </div>
              )}

              {symptoms.length > 0 && (
                <Button
                  onClick={handleAnalyze}
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? 'Analyzing...' : 'Analyze Symptoms'}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Important Notice */}
        <Card className="mt-6 border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> This tool is for informational purposes only. 
              It is not a substitute for professional medical advice. If you have severe 
              symptoms or medical emergency, please seek immediate medical attention.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
