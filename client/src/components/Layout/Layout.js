import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

const Layout = (props) => {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8"/>
        <meta name="description" content={props.description}/>
        <meta name="keywords" content={props.keywords}/>
        <meta name="author" content={props.author}/>
        <title>{props.title}</title>
      </Helmet>
      <Header></Header>
      
      <main style={{minHeight:"95vh"}}>
        
        {props.children}
        
        </main>
      <Footer></Footer>
    </React.Fragment>
  );
};

export default Layout;
