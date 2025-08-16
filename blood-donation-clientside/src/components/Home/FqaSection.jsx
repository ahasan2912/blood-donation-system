
const FqaSection = () => {
    const faqs = [
        {
            question: "How can I donate blood?",
            answer:
                "To donate blood, you first need to create an account on our website. Then, go to the 'Donate Blood' section, fill out your information, and our team will contact you with the next steps.",
        },
        {
            question: "What are the eligibility requirements for donating blood?",
            answer:
                "Generally, healthy individuals aged 18 to 65 can donate blood. You must weigh more than 50 kg and not have any major illnesses. Specific requirements can be found on the donation form.",
        },
        {
            question: "How often can I donate blood?",
            answer:
                "A healthy person can donate blood every three months (usually 90 days). In some cases, this may vary, so it's essential to consult a doctor.",
        },
        {
            question: "What precautions should I take before and after donating blood?",
            answer:
                "Before donating, drink plenty of water and eat a good meal. After donating, rest for at least 10-15 minutes and have some fluids or juice. It's best to avoid strenuous activities or driving right after.",
        },
        {
            question: "How can I request blood for someone in need?",
            answer:
                "To request blood, go to our 'Request Blood' section. Post a request with the necessary information (such as blood group, quantity, hospital name, etc.). This will notify our registered donors.",
        },
        {
            question: "Will my personal information be kept secure?",
            answer:
                "Yes, we are committed to protecting the privacy of your personal information. No information will be disclosed without your consent. Limited information is shared only between the donor and recipient for communication purposes.",
        },
        {
            question: "Is blood donation beneficial for health?",
            answer:
                "Blood donation is very beneficial for health. It helps in the production of new red blood cells, improves heart health, and some studies suggest it may help reduce the risk of certain cancers.",
        },
        {
            question: "Can I donate blood if I have a health condition?",
            answer:
                "Some conditions like high blood pressure, diabetes (if controlled), or a common cold may prevent you from donating blood. It's crucial to consult a doctor if you have a major illness or have recently had surgery.",
        },
        {
            question: "I don't know my blood group. How can I find out?",
            answer:
                "If you don't know your blood group, you can get it tested at a nearby hospital or clinic. Alternatively, if you attend one of our blood donation events, we may offer free blood group testing.",
        },
        {
            question: "Does blood donation hurt?",
            answer:
                "Blood donation is a simple process. You might feel a slight pinch when the needle is inserted, but it is very brief. The entire process is usually completed within 20-30 minutes.",
        },
    ];
    return (
        <div className="max-w-7xl mx-auto my-20 space-y-1">
            {faqs.map((faq, index) => (
                <div
                    key={index}
                    className={`collapse collapse-plus border border-red-300 plus-icon-lg`}
                >
                    <input
                        type="radio"
                        name="my-accordion-3"
                
                        defaultChecked={index === 0}
                    />
                    <div className="collapse-title font-semibold text-red-700">
                        {faq.question}
                    </div>
                    <div className="collapse-content text-base text-gray-800">
                        {faq.answer}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FqaSection;