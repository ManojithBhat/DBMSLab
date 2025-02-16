import { useState } from "react";
import { Link } from "react-router-dom";

const FAQ_data = [
  {
    question: "What is the National Service Scheme?",
    answer:
      "National Service Scheme, popularly known as NSS, is an extension of activities to the higher education system to orient the student youth to community service while they are studying in educational institutions, under the aegis of the Ministry of Youth Affairs & Sports, Govt. of India.",
  },
  {
    question: "When was the National Service Scheme launched?",
    answer:
      "National Service Scheme was launched on 24th September, 1969 by the then Education Minister Dr. V.K. R.V. Rao in 37 universities with 40,000 NSS volunteers covering all States.",
  },
  {
    question: "What is the Motto of NSS?",
    answer: 'The Motto or watchword of the National Service Scheme is "NOT ME BUT YOU."',
  },
];

const teamMembers = [
  { name: "Manish Raj ", admissionNumber: "1RV22IS033", department: "Information Science and Engineering" },
  { name: "Manojith Bhat V", admissionNumber: "1RV22IS034", department: "Information Science and Engineering" },
  { name: "Pranav Motamarri", admissionNumber: "1RV22IS046", department: "Information Science and Engineering" },
];

const HomePage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  // Replace this with actual authentication/role-check logic
  const isAdmin = true; // Set to `true` for admins, `false` otherwise

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            A comprehensive activity management system
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Track, manage, and optimize your NSS activities with our powerful platform. Seamlessly organize events,
            monitor participation, and measure impact.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-3 rounded-md bg-black text-white hover:bg-gray-800 text-sm font-medium"
            >
              Get Started
            </Link>
            <Link
              to="/list-events"
              className="w-full sm:w-auto px-8 py-3 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium"
            >
              View Events
            </Link>
            <Link
              to="/list-poc"
              className="w-full sm:w-auto px-8 py-3 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium"
            >
              View POCs
            </Link>
          </div>
          <div className="max-w-4xl mx-auto">
            <img src="../RDC.jpg" alt="NSS Activities Dashboard" className="w-full rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Everything you need to know about NSS</p>
          </div>

          <div className="w-full max-w-3xl mx-auto">
            {FAQ_data.map((item, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex justify-between items-center w-full py-5 text-left"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-base font-medium text-gray-900">{item.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openIndex === index ? "max-h-96 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="px-4 mx-10">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Team</h2>
          <div className="">
            <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admission No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {teamMembers.map((member, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.admissionNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
