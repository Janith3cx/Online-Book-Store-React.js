import '../App.css';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer'







const Homepage = () =>{

  

    return(
      <>
      <div className='homepage'>
        <div className='pagehead'>

          <Header/> 

        </div>

        <div className='pagebody'>
          
              <Body/>

        </div>  


         <div className='pagefoot'>

          <Footer/>

        </div> 

          

      </div>
      
      </>
    
      
      
             

    );
};
export default Homepage;