import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const features = [
  {
    title: 'Login/Signup',
    description: 'Securely access your account or create a new one.',
    icon: '🔐',
    route: '/signup',
  },
  {
    title: 'View Dashboard',
    description:
      'Get an overview of your activities and important information.',
    icon: '📊',
    route: '/profile',
  },
  {
    title: 'About',
    description: 'Learn more about our organization and its mission.',
    icon: 'ℹ️',
    route: '/about',
  },
  {
    title: 'Check All POCs',
    description: 'View and manage points of contact for various activities.',
    icon: '👥',
    route: '/list-poc',
  },
  {
    title: 'List All Events',
    description: 'Browse and participate in upcoming events.',
    icon: '📅',
    route: '/list-events',
  },
  {
    title: 'Raise a Complaint',
    description: 'Submit and track complaints or issues.',
    icon: '🚩',
    route: '/complaints',
  },
];

const adminFeatures = [
  ...features,
  {
    title: 'Add Events',
    description: 'Create and manage new events for the organization.',
    icon: '➕',
    route: '/addevent',
  },
];

const ProjectFeatures = () => {
  // const [user, setUser] = useState(null)
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(null)
  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkUserRole = async () => {
  //     try {
  //       const adminResponse = await axiosInstance.get("/auth/check-admin")
  //       if (adminResponse.data.data) {
  //         setUser({ role: "admin" })
  //       } else {
  //         const counsellorResponse = await axiosInstance.get("/auth/check-admin")
  //         if (counsellorResponse.data.data) {
  //           setUser({ role: "counsellor" })
  //         } else {
  //           setUser({ role: "user" })
  //         }
  //       }
  //       console.log(adminResponse)
  //       setLoading(false)
  //     } catch (err) {
  //       setError("Failed to fetch user details")
  //       setLoading(false)
  //     }
  //   }

  //   checkUserRole()
  // }, [])

  // if (loading) return <div className="text-center py-20">Loading...</div>
  // if (error) return <div className="text-center py-20 text-red-500">{error}</div>

  const featuresToRender = features;
  // user.role === "admin" ? adminFeatures : user.role === "counsellor" ? counsellorFeatures : features

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Project Features
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Our project offers a comprehensive platform for managing events,
          connecting with points of contact, and facilitating community
          engagement. Whether you're a student, admin, or counsellor, our
          features are designed to streamline your experience and enhance
          collaboration within the organization.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresToRender.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
              onClick={() => handleCardClick(feature.route)}
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectFeatures;
