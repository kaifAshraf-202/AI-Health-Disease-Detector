import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { AlertCircle, CheckCircle2, Home, Pill, Shield, AlertTriangle, Calendar } from 'lucide-react';
import { DiagnosisResult, Symptom } from '../utils/diseaseDetector';

export function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, symptoms } = location.state as { results: DiagnosisResult[], symptoms: Symptom[] } || {};

  if (!results || results.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl mb-2">No Results Found</h2>
            <p className="text-gray-600 mb-6">
              Please complete a symptom check first
            </p>
            <Link to="/symptom-checker">
              <Button>Go to Symptom Checker</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const topResult = results[0];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl mb-2">Diagnosis Results 📋</h1>
            <p className="text-gray-600">Based on your reported symptoms</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            <Home className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </div>

        {/* Your Symptoms */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Reported Symptoms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {symptoms.map((symptom) => (
                <Badge key={symptom.id} variant="secondary" className="px-3 py-1">
                  {symptom.name} ({symptom.severity})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Result */}
        <Card className="mb-6 border-2 border-blue-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">{topResult.disease}</CardTitle>
              <div className="flex items-center gap-2">
                <span className={`px-4 py-2 rounded-full ${
                  topResult.probability > 70 ? 'bg-red-100 text-red-700' :
                  topResult.probability > 40 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {topResult.probability}% match
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6">{topResult.description}</p>

            <Tabs defaultValue="remedies" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="remedies">
                  <Pill className="w-4 h-4 mr-2" />
                  Remedies
                </TabsTrigger>
                <TabsTrigger value="precautions">
                  <Shield className="w-4 h-4 mr-2" />
                  Precautions
                </TabsTrigger>
                <TabsTrigger value="doctor">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  See Doctor If
                </TabsTrigger>
              </TabsList>

              <TabsContent value="remedies" className="mt-4">
                <div className="space-y-4">
                  {topResult.remedies.map((remedy, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={
                          remedy.type === 'medication' ? 'default' :
                          remedy.type === 'lifestyle' ? 'secondary' :
                          'outline'
                        }>
                          {remedy.type.replace('-', ' ')}
                        </Badge>
                        {remedy.duration && (
                          <span className="text-sm text-gray-600">
                            Duration: {remedy.duration}
                          </span>
                        )}
                      </div>
                      <h4 className="mb-1">{remedy.title}</h4>
                      <p className="text-sm text-gray-600">{remedy.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="precautions" className="mt-4">
                <div className="space-y-2">
                  {topResult.precautions.map((precaution, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">{precaution}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="doctor" className="mt-4">
                <div className="space-y-2">
                  {topResult.whenToSeeDoctor.map((warning, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">{warning}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Other Possible Conditions */}
        {results.length > 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Other Possible Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.slice(1).map((result) => (
                <div key={result.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg">{result.disease}</h3>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {result.probability}% match
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{result.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4 justify-center">
          <Link to="/symptom-checker">
            <Button size="lg">Check New Symptoms</Button>
          </Link>
          <Link to="/medical-history">
            <Button size="lg" variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              View History
            </Button>
          </Link>
        </div>

        {/* Disclaimer */}
        <Card className="mt-6 border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-800">
              <strong>Medical Disclaimer:</strong> These results are AI-generated and for informational purposes only. 
              They are not a substitute for professional medical advice, diagnosis, or treatment. Always consult with 
              a qualified healthcare provider for proper medical care.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
