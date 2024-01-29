import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CarService from "../../services/CarService/CarService";
import { Car } from "../../models/responses/car/GetAllCarResponses";
import heroimage from "../../images/heroImage/heroimage1.png";
function CarDetail() {
  const [carDetail, setCarDetail] = useState<Car>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchDetails = async () => {
      if (id) {
        try {
          let service = new CarService();
          let response = await service.getByIdCar(parseInt(id));
          setCarDetail(response.data.data);
        } catch (error) {
          console.error("Error fetching details:", error);
        }
      }
    };

    fetchDetails();
  }, []);
  return (
    <div className="container">
      <div className="flex justify-center space-x-5 my-10">
        <div className=" basis-1/2 bg-slate-700 rounded-lg">
          <div className="flex flex-col justify-around h-full space-y-6 p-5">
            <h3 className="font-bold text-white text-3xl w-1/2">
              Sports car with the best design and acceleration
            </h3>
            <p className="text-white text-lg font-semibold">
              Safety and comfort while driving a futuristic and elegant sports
              car
            </p>

            <img src={heroimage} width={500} />
          </div>
        </div>
        <div className="basis-1/2 bg-white rounded-lg p-5 space-y-5">
          <h3 className="font-extrabold text-2xl ">
            Nissan {carDetail?.modelName}
          </h3>
          <p className="leading-relaxed text-gray-400 font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            autem natus tenetur delectus excepturi provident magni atque aliquid
            saepe distinctio!
          </p>
          <div className="flex flex-col justify-start space-y-1 w-1/3 font-semibold">
            <p className="flex justify-between">
              <span className="text-gray-400 ">Type Car</span>{" "}
              {carDetail?.categoryName}
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400">Capacity</span> 2 Person
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400 ">Steering</span> Manual
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400 ">Kilometer</span>{" "}
              {carDetail?.kilometer} KM
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400 ">Gasoline</span> 70L
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400 ">Year</span> {carDetail?.year}
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400 ">Color</span>{" "}
              {carDetail?.colorName}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xl">
              ${carDetail?.price}/
              <span className="text-gray-400 text-sm">days</span>
            </h3>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-slate-700 p-5 mb-10 rounded-lg items-center justify-around w-1/2 mx-auto space-y-5">
        <p className="text-white  font-semibold leading-relaxed tracking-wide ">
          By clicking the Rental Now button, you can quickly and easily rent
          vehicles that will meet your travels or daily needs. We help you find
          the most suitable vehicle for you with our affordable prices, wide
          range of vehicles and user-friendly reservation system. We are here to
          make your travels more comfortable and enjoyable. Step into a new
          adventure by renting a car now!
        </p>
        <Link
          className="bg-slate-500 font-bold text-xl text-white border-2 p-2 rounded-lg hover:bg-slate-700 duration-500"
          to={"/rental"}
        >
          Rental Now
        </Link>
      </div>
    </div>
  );
}

export default CarDetail;