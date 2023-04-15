import React from "react";
import Header from "../components/Header";
import CallToActionSection from "../components/homeComponents/CallToActionSection";
import ContactInfo from "../components/homeComponents/ContactInfo";
import ShopSection from "../components/homeComponents/ShopSection";
import Footer from "../components/Footer";
import { useParams } from "react-router";

const HomeScreen = () => {
  window.scrollTo(0, 0);
  const { search, pagenumber } = useParams();
  return (
    <div>
      <Header />
      <ShopSection search={search} pagenumber={pagenumber} />
      <CallToActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;
