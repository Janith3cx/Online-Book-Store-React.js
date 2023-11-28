import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, FormGroup, Image } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CategoryPrevierw = () => {
  const { number } = useParams();
  const [categoryByBooks, setCategoryByBooks] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/books/category/${number}`)
      .then((response) => {
        setCategoryByBooks(response.data);
      })
      .catch((error) => {
        console.error('loading error', error);
      });
  }, [number]);

  return (
    <>
      <div>
        <Header />
      </div>

      <div className="category-addtocart-content">
        {categoryByBooks ? (
          categoryByBooks.map((categoryByBook) => (
            <Link
              key={categoryByBook.id}
              className="category-pre"
              to={`/books/${categoryByBook.id}`}
            >
              <FormGroup className="category-pre-holder">
              <div className="category-pre-formset">
              <div className="category-pre-inner-div">
                <Form className='category-pre-form'>
                <Image
                  className="category-pre-holder-image"
                  src={`data:image/png;base64,${categoryByBook.image}`}
                  alt="image"
                  onError={() => console.log("Image Loading Error")}
                ></Image>
                </Form >
                  <div className="category-text">
                    <h3 className="category-title">{categoryByBook.title}</h3>
                    <h6>{categoryByBook.author.authorName}</h6>
                    <h6>Rs:{categoryByBook.price}.00</h6>
                    <h6 className="category-des">{categoryByBook.isbnNumber}</h6>
                    <h6 className="category-des">{categoryByBook.description}</h6>
                    <h6 style={{ textTransform: 'capitalize' }}>{categoryByBook.category.name}</h6>
                    <h6 style={{ textTransform: 'capitalize' }} className="category-des">{categoryByBook.subcategory.name}</h6>
                  </div>
              </div>
              </div>
              </FormGroup>
            </Link>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default CategoryPrevierw;
