import { Link } from 'react-router-dom';
import { Activity, Brain, Heart, Shield, TrendingUp, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export function Landing() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Detection',
      description: 'Advanced algorithms analyze your symptoms to provide accurate health assessments'
    },
    {
      icon: Heart,
      title: 'Personalized Care',
      description: 'Get customized remedy suggestions based on your unique health profile'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your health data is secure and confidential with end-to-end protection'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your health journey with comprehensive medical history'
    },
    {
      icon: Users,
      title: 'Expert Guidance',
      description: 'Evidence-based recommendations from medical knowledge database'
    },
    {
      icon: Activity,
      title: '24/7 Access',
      description: 'Get health insights anytime, anywhere at your convenience'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl mb-6 text-gray-900">
            AI Health Disease Detector
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your intelligent health companion for early disease detection and personalized remedy suggestions
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-blue-500 transition-colors">
              <CardContent className="p-6">
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <div className="mt-24">
          <h2 className="text-4xl text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-blue-600">1</span>
              </div>
              <h3 className="text-xl mb-2">Enter Symptoms</h3>
              <p className="text-gray-600">
                Describe your symptoms and their severity in our easy-to-use interface
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-blue-600">2</span>
              </div>
              <h3 className="text-xl mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI engine analyzes your symptoms against extensive medical databases
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-blue-600">3</span>
              </div>
              <h3 className="text-xl mb-2">Get Results</h3>
              <p className="text-gray-600">
                Receive personalized diagnosis and remedy suggestions with precautions
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-blue-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who trust our AI-powered health detection system
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary">
              Start Free Trial
            </Button>
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 text-center text-sm text-gray-500 max-w-3xl mx-auto">
          <p>
            <strong>Medical Disclaimer:</strong> This AI health detection system is for informational purposes only 
            and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice 
            of your physician or other qualified health provider with any questions you may have regarding a medical condition.
          </p>
        </div>
      </div>
    </div>
  );
}
