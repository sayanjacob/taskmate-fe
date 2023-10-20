import axios from "axios";
import './Nav.css'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
    const [user, setUser] = useState("");
    const [city, setCity] = useState("Choose A City");
    const [cityList, setCityList] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for search term
    const [filteredCities, setFilteredCities] = useState([]); // State for filtered cities
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            const response = await axios.post("http://127.0.0.1:5000/register", formData);
            console.log(response.status);
            setFormData({
                name: '',
                email: '',
                password: '',
            })

            console.log('Form data:', formData);
        } catch (error) {
            console.error('An error occurred:', error);
            alert(`User with email: ${formData.email} already exists. Try again.`);
            setFormData({
                name: '',
                email: '',
                password: '',
            });
        }
    }

    async function handleLoginSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:5000/login", loginData);
            console.log(response.data)
            sessionStorage.setItem("Loggeduser", response.data.username)
            setUser(response.data.username)
            if (city === "Choose A City") {
                // Open the city selection modal
                const cityModal = document.getElementById("exampleModal");
                if (cityModal) {
                    const bootstrapModal = new bootstrap.Modal(cityModal);
                    bootstrapModal.show();
                }

            } else {
                // Navigate to the desired page
                navigate('/categories');
            }

        } catch (error) {
            alert("Invalid Login Credentials")
            console.error('Login error:', error);
        }
    }

    function handleLoginInputChange(e) {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    }

    useEffect(() => {
        async function loadCities() {
            try {
                const response = await axios.get("http://127.0.0.1:5000/cities");
                setCityList(response.data["cities"]);
                const storedCity = localStorage.getItem("city");
                if (storedCity && storedCity !== "Select City") {
                    setCity(storedCity);
                }
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        }
        loadCities();

        async function login() {
            setUser(sessionStorage.getItem('Loggeduser'))

        }
        login();

    }, [user]);
    // console.log(cityList)
    useEffect(() => {
        // Filter cities based on the search term
        const filtered = cityList.filter((cityName) =>
            cityName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCities(filtered);
    }, [searchTerm, cityList]);

    async function selectCity(cityName) {
        setCity(cityName);
        localStorage.setItem("city", cityName);
    }

    async function handlelogout() {
        const res = axios.post("http://127.0.0.1:5000/logout")
        console.log(res)
        setUser()
        setCity("Choose A City")
        sessionStorage.removeItem('Loggeduser')
        localStorage.removeItem('city')
        // alert("Successfully Logged Out")
        navigate('/')
    }




    return (
        <>
            <nav className="navbar navbar-expand-lg navbg fixed-top">
                <div className="container-fluid">
                    <div className="d-flex flex-row justify-content-center ps-4 py-1">
                        <img src="src\assets\Work.png" className="mt-1" alt="" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '5px' }} />
                        <h6 className="ps-2 mt-1 ">Work<br></br>Buddy</h6>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto custom-align-right ">


                            <li className="nav-item">
                                <button type="button" className="btn btn-primary nav-btn mx-auto px-3 py-2" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ backgroundColor: '#202020', color: 'white', borderRadius: '10px', borderWidth: '0' }}>
                                    {city} <img src="src\assets\location.png" alt="" width={25} />
                                </button>
                            </li>
                            <li className="nav-item d-flex flex-coloumn justify-content-center">
                                <Link to="/" className="nav-link pt-2">Home</Link>
                            </li>
                            <li className="nav-item d-flex flex-coloumn justify-content-center">
                                <Link to="categories" className="nav-link pt-2">Services</Link>
                            </li>
                            <li className="nav-item d-flex flex-coloumn justify-content-center">
                                <Link to="services" className="nav-link pt-2">Deals</Link>
                            </li>
                            <li className="nav-item d-flex flex-coloumn justify-content-center">
                            <Link to="cart" className="nav-link pt-2">Cart</Link>

                            </li>

                            {user ? (
                                <>
                                    <li className="nav-item d-flex flex-coloumn justify-content-center  mx-auto px-3 py-2" style={{ borderRadius: '10px',backgroundColor:'aliceblue' }}>
                                        <img className="me-1 mt-1 " src="src\assets\account.png" alt="" width={20} height={20} />{user}

                                    </li>
                                    <li className="nav-item d-flex flex-coloumn justify-content-center">
                                        <button className="nav-btn mx-auto px-2 py-2" onClick={handlelogout} > <img src="src\assets\logout.png" alt="" width={25} /></button>

                                    </li>




                                </>

                            ) : (<>
                                <li className="nav-item d-flex flex-coloumn justify-content-center">
                                    <button className='nav-btn px-3 py-2' type="submit" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#LoginModal">Login <img src="src\assets\right-arrow.png" alt="" width={20} /></button>
                                </li>
                            </>
                            )}


                        </ul>
                    </div>
                </div>
            </nav>



            <div className="modal modal-lg fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">

                    <div className="modal-content ">
                        <div className="modal-body ">
                            <div className="row justify-content-center pt-4 pb-2">
                                <div className="col-2"></div>
                                <div className="row col-8 mx-auto" >
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control serForm py-2 "
                                            placeholder=" Search Service Categories"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <span className="input-group-text py-2 ms-2 " style={{ backgroundColor: "transparent", borderRadius: '50px' }}>
                                                <i className="bi bi-search"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="col-2"></div>

                            </div>
                            {/* Search bar */}



                            <div className="row my-4 mx-3">
                                {filteredCities.map((cityName, index) => (
                                    <div className="col-md-3 my-1 " key={index}>
                                        <div onClick={() => selectCity(cityName)} className="text-center " data-bs-dismiss="modal" >
                                            <h6 className="px-1 py-1" >{cityName}</h6>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal modal-lg fade" id="LoginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content ">
                        <div className="modal-body py-4">
                            <div className="container-fluid">
                                <div className="row d-flex flex-row justify-content-evenly">
                                    <div className="col-6 card  px-3 py-2" style={{ backgroundColor: 'white', borderRadius: '10px' }}>
                                        <h2>Sign Up Here!</h2>
                                        <form onSubmit={handleSubmit} className="mx-1 my-4">
                                            <div className="mb-3">
                                                <label htmlFor="name" className="form-label">Name:</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Email:</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="password" className="form-label">Password:</label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary form-btn-si">Sign Up</button>
                                        </form>
                                    </div>
                                    <div className="col-5 d-flex flex-column px-4 py-5 card " style={{ backgroundColor: '#F0F3F3', borderRadius: '10px' }}>
                                        <h2 className="">Login</h2>
                                        <form onSubmit={handleLoginSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="loginEmail" className="form-label">Email:</label>
                                                <input
                                                    type="email"
                                                    id="loginEmail"
                                                    name="email"
                                                    value={loginData.email}
                                                    onChange={handleLoginInputChange}
                                                    className="form-control "
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="loginPassword" className="form-label">Password:</label>
                                                <input
                                                    type="password"
                                                    id="loginPassword"
                                                    name="password"
                                                    value={loginData.password}
                                                    onChange={handleLoginInputChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary form-btn" data-bs-dismiss="modal" >Login</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            


        </>


    )
}
export default Nav;