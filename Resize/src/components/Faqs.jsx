import { useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"


const Faqs = () => {
    const [openQuestion, setOpenQuestion] = useState(null);

    const toggleQuestion = (index) => {
        setOpenQuestion(openQuestion === index ? null : index);
    };

    const faqs = [
        {
            question: "What's Resize.com?",
            answer: "Well, it's an image resizer and editor packed into one convenient and free app. There are no subscriptions and you don't need to register an account. Simply resize your images on the fly!"
        },
        {
            question: "What type of image files are supported?",
            answer: "Our handy-dandy editor supports PNG, JPG, and WebP images. If you're working with another format, please visit our image converter to get the most out of Resize.com."
        },
        {
            question: "Are my pictures safe?",
            answer: "Privacy concerns? We hear you! With Resize.com, images never leave your device since our editor does all the work locally in your web browser. Technically, your images never reach our server. We do collect some stats to improve and monitor our app. That's it!",
        },
        {
            question: "Is image quality affected?",
            answer: "Without getting too technical, we resize and compress images with lossy compression. A compression method where the image file is compressed to maintain visual quality almost identical to the original. Although some data is lost in the process, the difference is often undetectable to the human eye, making lossy compression ideal for web use, where smaller files improve loading times and save storage space.                    Examples of formats using lossy compression include JPEG and WebP."
        },
        {
            question: "Is Resize.com a free application?",
            answer: "It's a free app! But we do have to pay our landlord (our hosting company), so we may show ads or promote affiliate offers. We hope they don't distract you from your edits."
        },
        {
            question: "How do I contact you?",
            answer: "We would love to hear from you! For feedback, bugs, feature requests, and collaborations, please email anonymousbrat@duck.com or message us on X where we also post some cool stats. Do follow along!"
        },
    ]

    return (
        <section className="lg:px-[6rem] px-4 flex md:flex-row flex-col items-start md:gap-[19rem] gap-4 bg-darkLight border border-b-borderLight border-t-0 border-l-0">
            {/* FAQ HEADER */}
            <h1 className="text-white font-semibold text-3xl">FAQ</h1>

            {/* Questions Container */}
            <div className="w-full md:w-2/3  bg-dark border border-border">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-dark">
                        {/* {Question} */}
                        <div
                            className="flex items-center justify-between p-4 cursor-pointer border border-b-border border-l-0 border-r-0 border-t-0 transition-all"
                            onClick={() => toggleQuestion(index)}
                        >
                            <h2 className="text-white text-lg font-medium">{faq.question}</h2>
                            {openQuestion === index ? (
                                <FaChevronUp className="text-white" />
                            ) : (
                                <FaChevronDown className="text-white" />
                            )}
                        </div>

                        {/* answer */}
                        <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            openQuestion === index ? "max-h-[200px] p-4" : "max-h-0"
                        }`}
                        style={{ backgroundColor: openQuestion === index ? "#1e293b" : "transparent" }}
                        >
                        <p className="text-text text-base">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}


export default Faqs
