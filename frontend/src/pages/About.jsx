const aboutItems = [
    {
      title: "Who We Are",
      description:
        "The National Service Scheme (NSS), established under the Ministry of Youth Affairs & Sports, Government of India, was launched in 1969, during the Centenary Year of Mahatma Gandhi's birth. Initially implemented in 37 universities with the participation of 40,000 students, NSS primarily aims to foster the holistic development of students through community service. RVCE is proud to be one of the institutions that embraced the NSS initiative, contributing to the growth and development of both its students and the community.",
      imageSrc: "../public/abouthero2.jpeg",
      imageAlt: "Students engaging in community service",
    },
    {
      title: "Core Values",
      description:
        "The core value of NSS is to instill a deep sense of social responsibility and civic consciousness in students, motivating them to serve the community selflessly. It seeks to nurture leadership, discipline, and a spirit of service through a range of community engagement activities. The mission of NSS is to empower students to become proactive, dedicated citizens by encouraging participation in community service, honing leadership skills, and fostering social awareness to contribute positively to society's development.",
      imageSrc: "../public/abouthero3.jpeg",
      imageAlt: "Students participating in a group activity",
    },
    {
      title: "Our Activities",
      description:
        "NSS RVCE actively organizes various initiatives to contribute to the community and raise awareness. These include blood donation camps, which not only save lives but also highlight the significance of blood donation. The training of first responders equips individuals to rescue road accident victims, ensuring timely aid. The Utsarga Marathon is another notable event, where all registration fees are donated to charitable organizations supporting vital causes. Additionally, the club hosts walkathons to raise awareness about pressing societal issues. These events foster community participation and inspire a sense of unity and support for meaningful initiatives.",
      imageSrc: "../public/governer.jpg",
      imageAlt: "Students in a charity marathon event",
    },
  ]
  
  const AboutUs = () => {
    return (
      <section className="py-8 mx-28 ">
        <div className="container mx-auto px-9">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">About Us</h2>
          {aboutItems.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center mb-16 last:mb-0">
              {index % 2 === 0 ? (
                <>
                  <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
                    <img
                      src={item.imageSrc || "/placeholder.svg"}
                      alt={item.imageAlt}
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8 md:order-2 p-8">
                    <img
                      src={item.imageSrc || "/placeholder.svg"}
                      alt={item.imageAlt}
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                  <div className="w-full md:w-1/2 md:order-1">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    )
  }
  
  export default AboutUs
  
  