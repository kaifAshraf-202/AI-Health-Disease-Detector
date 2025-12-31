import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMedicalHistory } from '../utils/diseaseDetector';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, FileText, TrendingUp, Stethoscope } from 'lucide-react';

export function MedicalHistory() {
  const { user } = useAuth();
  const medicalHistory = user ? getMedicalHistory(user.id) : [];

  const groupByMonth = () => {
    const grouped: { [key: string]: typeof medicalHistory } = {};
    
    medicalHistory.forEach((diagnosis) => {
      const date = new Date(diagnosis.date);
      const key = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
      
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(diagnosis);
    });

    return grouped;
  };

  const groupedHistory = groupByMonth();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl mb-2">Medical History 📚</h1>
            <p className="text-gray-600">View all your past health checks and diagnoses</p>
          </div>
          <Link to="/symptom-checker">
            <Button>
              <Stethoscope className="w-4 h-4 mr-2" />
              New Check
            </Button>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Checks</p>
                  <p className="text-3xl">{medicalHistory.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">This Month</p>
                  <p className="text-3xl">
                    {medicalHistory.filter(d => {
                      const date = new Date(d.date);
                      const now = new Date();
                      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                    }).length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg. Confidence</p>
                  <p className="text-3xl">
                    {medicalHistory.length > 0 
                      ? Math.round(medicalHistory.reduce((acc, d) => acc + d.probability, 0) / medicalHistory.length)
                      : 0}%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* History Timeline */}
        {medicalHistory.length > 0 ? (
          <div className="space-y-8">
            {Object.entries(groupedHistory).map(([month, diagnoses]) => (
              <div key={month}>
                <h2 className="text-2xl mb-4 flex items-center gap-2">
                  <Calendar className="w-6 h-6" />
                  {month}
                </h2>
                <div className="space-y-4">
                  {diagnoses.map((diagnosis) => (
                    <Card key={diagnosis.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl">{diagnosis.disease}</h3>
                              <Badge variant={
                                diagnosis.probability > 70 ? 'destructive' :
                                diagnosis.probability > 40 ? 'secondary' :
                                'outline'
                              }>
                                {diagnosis.probability}% match
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-3">{diagnosis.description}</p>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            <p>{new Date(diagnosis.date).toLocaleDateString()}</p>
                            <p>{new Date(diagnosis.date).toLocaleTimeString()}</p>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <p className="text-sm text-gray-600 mb-2">Key Remedies:</p>
                          <div className="flex flex-wrap gap-2">
                            {diagnosis.remedies.slice(0, 3).map((remedy, idx) => (
                              <Badge key={idx} variant="outline">
                                {remedy.title}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl mb-2">No Medical History</h3>
              <p className="text-gray-600 mb-6">
                You haven't completed any health checks yet
              </p>
              <Link to="/symptom-checker">
                <Button>Start Your First Check</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
