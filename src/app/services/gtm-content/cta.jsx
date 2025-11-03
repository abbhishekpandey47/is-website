import React from "react";
import CTA from "../../../Components/CTA/CTA";

export default function Cta() {
    return (
        <CTA 
            title={
                <>
                    Want your {" "}
                    <span
                        className="bg-clip-text text-transparent"
                        style={{
                            backgroundImage: "linear-gradient(90.63deg, #6B5BE7 14.54%, #A64AE7 42.42%, #C62FE7 86.96%)"
                        }}
                    >GTM motion</span> {" "}to feel like a compound engine?
                </>
            }
            description="Let's talk about how Infrasity can power your next launch, one page at a time."
            buttonText="Book a Call"
        />
    );
}
