import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMedicalHistory } from '../utils/diseaseDetector';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Activity, FileText, Stethoscope, User, TrendingUp, Calendar } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();
  const medicalHistory = user ? getMedicalHistory(user.id) : [];
  const recentDiagnoses = medicalHistory.slice(0, 3);

  const stats = [
    {
      icon: FileText,
      label: 'Total Checks',
      value: medicalHistory.length,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      icon: Activity,
      label: 'This Month',
      value: medicalHistory.filter(d => {
        const date = new Date(d.date);
        const now = new Date();
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      }).length,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      icon: TrendingUp,
      label: 'Health Score',
      value: '85%',
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Welcome back, {user?.name}! 👋</h1>
          <p className="text-gray-600">Here's your health overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <Link to="/symptom-checker" className="block">
                <Button className="w-full h-24 flex flex-col gap-2" variant="outline">
                  <Stethoscope className="w-6 h-6" />
                  <span>Check Symptoms</span>
                </Button>
              </Link>
              <Link to="/medical-history" className="block">
                <Button className="w-full h-24 flex flex-col gap-2" variant="outline">
                  <FileText className="w-6 h-6" />
                  <span>View History</span>
                </Button>
              </Link>
              <Link to="/profile" className="block">
                <Button className="w-full h-24 flex flex-col gap-2" variant="outline">
                  <User className="w-6 h-6" />
                  <span>Edit Profile</span>
                </Button>
              </Link>
              <Link to="/about" className="block">
                <Button className="w-full h-24 flex flex-col gap-2" variant="outline">
                  <Activity className="w-6 h-6" />
                  <span>How It Works</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Diagnoses */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Health Checks</CardTitle>
          </CardHeader>
          <CardContent>
            {recentDiagnoses.length > 0 ? (
              <div className="space-y-4">
                {recentDiagnoses.map((diagnosis) => (
                  <Link
                    key={diagnosis.id}
                    to={`/results/${diagnosis.id}`}
                    className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg">{diagnosis.disease}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            diagnosis.probability > 70 ? 'bg-red-100 text-red-700' :
                            diagnosis.probability > 40 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {diagnosis.probability}% match
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-1">
                          {diagnosis.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(diagnosis.date).toLocaleDateString()}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No health checks yet</p>
                <Link to="/symptom-checker">
                  <Button>Start Your First Check</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
