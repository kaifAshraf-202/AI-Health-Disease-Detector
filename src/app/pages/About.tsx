import { Card, CardContent } from '../components/ui/card';
import { Brain, Database, Lock, Zap, Users, Heart } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Our advanced machine learning algorithms analyze your symptoms against a comprehensive medical database to provide accurate health assessments.'
    },
    {
      icon: Database,
      title: 'Extensive Medical Database',
      description: 'Access to thousands of disease profiles, symptoms, and treatment options curated from reliable medical sources and research.'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get immediate health insights and remedy suggestions without waiting for appointments, available 24/7.'
    },
    {
      icon: Lock,
      title: 'Privacy & Security',
      description: 'Your health data is encrypted and stored securely. We never share your personal information with third parties.'
    },
    {
      icon: Users,
      title: 'Evidence-Based',
      description: 'All recommendations are based on peer-reviewed medical research and clinical guidelines from trusted health organizations.'
    },
    {
      icon: Heart,
      title: 'Personalized Care',
      description: 'Receive customized remedy suggestions based on your specific symptoms, severity, and health profile.'
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Input Your Symptoms',
      description: 'Describe what you\'re experiencing using our intuitive symptom checker. Add multiple symptoms and specify their severity.'
    },
    {
      step: 2,
      title: 'AI Processing',
      description: 'Our AI engine analyzes your symptoms using pattern recognition and compares them against our medical database.'
    },
    {
      step: 3,
      title: 'Get Diagnosis',
      description: 'Receive a ranked list of possible conditions with probability scores based on symptom matching.'
    },
    {
      step: 4,
      title: 'Remedy Suggestions',
      description: 'Get personalized treatment recommendations including medications, lifestyle changes, and home remedies.'
    },
    {
      step: 5,
      title: 'Track Progress',
      description: 'Monitor your health journey through our medical history feature and track patterns over time.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4">About Our System 🏥</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering individuals with AI-powered health insights for early disease detection 
            and personalized remedy suggestions
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12 bg-blue-50 border-blue-200">
          <CardContent className="p-8">
            <h2 className="text-3xl mb-4 text-center">Our Mission</h2>
            <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto">
              To make quality healthcare accessible to everyone by leveraging artificial intelligence 
              and machine learning technology. We believe in empowering individuals with knowledge 
              about their health, enabling early detection of potential issues, and providing 
              evidence-based remedy suggestions to improve overall well-being.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-3xl mb-8 text-center">How It Works</h2>
          <div className="space-y-6">
            {howItWorks.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">{item.step}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl mb-6 text-center">Technology Stack</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl mb-3">Frontend</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• React.js for interactive user interface</li>
                  <li>• TypeScript for type-safe code</li>
                  <li>• Tailwind CSS for modern styling</li>
                  <li>• React Router for navigation</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl mb-3">Backend (Simulated)</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Local storage for data persistence</li>
                  <li>• Machine learning algorithms for diagnosis</li>
                  <li>• Pattern matching for symptom analysis</li>
                  <li>• Secure authentication system</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <h3 className="text-xl mb-3">Important Disclaimer</h3>
            <p className="text-gray-700 mb-4">
              <strong>This AI Health Disease Detector is for educational and informational purposes only.</strong>
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Not a substitute for professional medical advice, diagnosis, or treatment</li>
              <li>• Always seek advice from qualified healthcare providers</li>
              <li>• Do not delay seeking medical attention based on information provided</li>
              <li>• In case of emergency, call emergency services immediately</li>
              <li>• Results are AI-generated and should be verified by medical professionals</li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl mb-4">Questions or Feedback?</h2>
          <p className="text-gray-600">
            We're constantly improving our system. Your feedback helps us serve you better.
          </p>
        </div>
      </div>
    </div>
  );
}
