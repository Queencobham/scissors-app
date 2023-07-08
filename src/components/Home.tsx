import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import Possibilities from "./Possibilities/Possibilities";
import Why from "./Why/Why"
import Pricing from "./Pricing/Pricing";
import Cta from "./CTA/Cta";
import Faq from "./Faq/Faq"
import Optimization from "./Optimization/Optimization";
import Footer from "./Footer/Footer";


function Home(){
    return(
        <>
        <Header />
        <Hero />
        <Possibilities />
        <Why />
        <Pricing />
        <Cta />
        <Faq />
        <Optimization />
        <Footer />
        </>
    )
}

export default Home