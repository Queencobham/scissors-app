import Accordion from './Accordion'
import './Faq.css'

export default function Faq(){
    return(
        <div className="faq">
            <div className="faq-title">
             <h2>FAQs</h2>
            </div>
            <div className="faq-details">
                <div className="accordion">
                 <Accordion question="How does the URL shortening work?" answer=" URL shortening works by taking a long URL and creating a shorter, condensed version that redirects to the original URL. When a user clicks on the shortened link, they are redirected to the intended destination."/>
                 <Accordion question="Is it necessary to create an account to use the Url shortening service?" answer="Yes"/>
                 <Accordion question="Are the shortened links permanent? Will they expire?" answer="Yes there are permanent. No there will not expire."/>
                 <Accordion question="Are there any limitations on the number of URLs I can shorten?" answer="No"/>
                 <Accordion question="Can I customize the shortened URLs to reflect my brand or content?" answer="Yes you can"/>
                 <Accordion question="Can I track the performance of my shortened URLs?" answer="Yes you can. Through analytics"/>
                 <Accordion question=" How secure is the URL shortening service? Are the shortened links protected against spam or malicious activity?" answer="The URL shortening service is very secured"/>
                </div>
            </div>
        </div>
    )
}