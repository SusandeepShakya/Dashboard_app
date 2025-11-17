import React, { useMemo } from "react";

interface Feature {
  title: string;
  items: string[];
  bgColor: string;
  textColor: string;
  titleColor: string;
}

interface HomeProps {
  title?: string;
  description?: string;
  features?: Feature[];
}

const Home: React.FC<HomeProps> = ({
  title = "Welcome to Dashboard",
  description = "This is a responsive dashboard application built with React, Context API, and TypeScript.",
  features,
}) => {
  const defaultFeatures: Feature[] = useMemo(() => [
    {
      title: "Features",
      items: [
        "Responsive design with TailwindCSS",
        "React Context API state management",
        "API integration",
        "Search and filtering",
        "Pagination",
        "Error handling",
      ],
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      titleColor: "text-blue-900",
    },
    {
      title: "Technology Stack",
      items: [
        "React 19 with TypeScript",
        "React Context API",
        "TailwindCSS",
        "Axios for API calls",
        "JSONPlaceholder API",
      ],
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      titleColor: "text-green-900",
    },
  ], []);

  const displayFeatures = features || defaultFeatures;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        <p className="text-gray-600 mb-6">
          {description}
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {displayFeatures.map((feature, index) => (
            <div key={index} className={`${feature.bgColor} p-6 rounded-lg`}>
              <h3 className={`text-lg font-semibold ${feature.titleColor} mb-2`}>
                {feature.title}
              </h3>
              <ul className={`${feature.textColor} list-disc list-inside space-y-1`}>
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
