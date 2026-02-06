import { 
  Plane, Hotel, Globe, FileText, Shield, Users 
} from 'lucide-react';

 const services = [
    {
      id: 1,
      title: "Flight Arrangements",
      description: "Working with trusted airline partners to offer competitive fares and dependable flight options without compromising on quality or comfort.",
      icon: Plane,
      bgColor: "bg-blue-50",
      cardBg: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
      accentColor: "bg-blue-600",
      borderColor: "border-blue-200",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop",
      color: "from-blue-400 to-cyan-400"
    },
    {
      id: 2,
      title: "Hotel Bookings",
      description: "Carefully selected accommodation options that balance quality, comfort, and value for every type of traveler.",
      icon: Hotel,
      bgColor: "bg-purple-50",
      cardBg: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconColor: "text-purple-600",
      accentColor: "bg-purple-600",
      borderColor: "border-purple-200",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      color: "from-purple-400 to-pink-400"
    },
    {
      id: 3,
      title: "Complete Holiday Packages",
      description: "Comprehensive travel packages that take care of all the details, from flights to accommodation and beyond.",
      icon: Globe,
      bgColor: "bg-green-50",
      cardBg: "bg-gradient-to-br from-green-50 to-green-100",
      iconColor: "text-green-600",
      accentColor: "bg-green-600",
      borderColor: "border-green-200",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
      color: "from-green-400 to-emerald-400"
    },
    {
      id: 4,
      title: "Visa Guidance",
      description: "Expert support with visa requirements and travel documentation to help you prepare properly and avoid stress.",
      icon: FileText,
      bgColor: "bg-pink-50",
      cardBg: "bg-gradient-to-br from-pink-50 to-pink-100",
      iconColor: "text-pink-600",
      accentColor: "bg-pink-600",
      borderColor: "border-pink-200",
      image: "https://images.unsplash.com/photo-1554224311-beee4ece8296?w=400&h=300&fit=crop",
      color: "from-orange-400 to-red-400"
    },
    {
      id: 5,
      title: "Travel Insurance",
      description: "Comprehensive travel insurance options to protect your journey and give you peace of mind.",
      icon: Shield,
      bgColor: "bg-orange-50",
      cardBg: "bg-gradient-to-br from-orange-50 to-orange-100",
      iconColor: "text-orange-600",
      accentColor: "bg-orange-600",
      borderColor: "border-orange-200",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
      color: "from-indigo-400 to-blue-400"
    },
    {
      id: 6,
      title: "Group Tours",
      description: "Carefully organized group tours with attention to detail and focus on creating memorable experiences.",
      icon: Users,
      bgColor: "bg-teal-50",
      cardBg: "bg-gradient-to-br from-teal-50 to-teal-100",
      iconColor: "text-teal-600",
      accentColor: "bg-teal-600",
      borderColor: "border-teal-200",
      image: "https://images.unsplash.com/photo-1528543606781-2f6e6857f318?w=400&h=300&fit=crop",
      color: "from-rose-400 to-pink-400"
    }
  ];

  export default services;