import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {addnew} from '../redux/commentreducer'
const RoundedParagraph = ({ children }) => (
    <p style={{
        background: '#f0f0f0',
        padding: '10px 15px',
        borderRadius: '20px',
        textAlign: 'center',
        fontSize: '14px',
        marginTop: '10px',
    }}>
        {children}
    </p>
);

const Searchresult = ({ result1 }) => {
    const dispatch = useDispatch();

    return (
        <div className="container my-5">
            <div className="row">
                {result1.length > 0 ? (
                    result1.map((product) => (
                        <div key={product._id} className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <img
                                    src={product.pic}
                                    alt={product.title}
                                    className="card-img-top"
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text text-muted">
                                        {product.description.length > 100
                                            ? product.description.substring(0, 100) + '...'
                                            : product.description}
                                    </p>
                                    <p className="card-text fw-bold text-primary">
                                        Price: ${product.price.toFixed(2)}
                                    </p>
                                    <button
                                        className="btn btn-success me-2"
                                        onClick={() =>
                                            dispatch(
                                                addnew({
                                                    id: product._id,
                                                    image: product.pic,
                                                    title: product.title,
                                                    price: product.price,
                                                    description: product.description,
                                                    quantity: 1,
                                                })
                                            )
                                        }
                                    >
                                        Add to Cart
                                    </button>
                                    <Link
                                        to={`/items/${product._id}`}
                                        style={{ textDecoration: 'none', color: 'black' }}
                                    >
                                        <RoundedParagraph>View More</RoundedParagraph>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No result1 found.</p>
                )}
            </div>
        </div>
    );
};

export default Searchresult;
