import React, { useEffect, useState } from "react";
import CarService from "../../services/CarService/CarService";
import { useParams } from "react-router-dom";
import heroimage2 from "/images/heroImage/heroimage2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faDroplet,
  faGasPump,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function CategoryList() {

   interface Car  {
    id: number;
    price: number;
    plate: string;
    gearType: string;
    kilometer: number;
    year: number;
    modelName: string;
    colorName: string;
    fuelType: string;
    categoryId: number;
    categoryName: string;
    brandId: number;
    brandName: string;
    amountOfFuel: string;
    description: string;
    isAvailable: boolean;
    numberOfSeats: number;
    images: Image[];
  }
  interface Image {
    id: number;
    url: string;
    publicId: string;
    width: number;
    height: number;
    format: string;
    bytes: number;
    carId: number;
  }

  const { id } = useParams();
  const [cars, setCars] = useState<Car[]>([]); 

  useEffect(() => {
    const categoryId = id ? parseInt(id, 10) : undefined;

    if (categoryId !== undefined) {
      let carService = new CarService();
      carService
        .getByCategoryId(categoryId)
        .then((result) => setCars(result.data.data));
    } else {
      console.error("Invalid category ID");
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cars.map((car) => (
        <div
          key={car.id}
          className="border bg-white w-full md:w-auto mx-auto md:mx-0 p-5 rounded-lg space-y-8"
        >
          <div>
          <h4 className="font-bold">{car.brandName}</h4>
            <h4 className="font-bold">{car.modelName}</h4>
            <p className="text-gray-400">{car.categoryName}</p>
          </div>
          <div>
            <img src={heroimage2} width={280} alt="" />
          </div>
          <div className="flex justify-around">
            <div className="flex items-center">
              <FontAwesomeIcon className="mr-1 text-gray-400" icon={faGasPump} />
              <p className="text-sm text-gray-400">{car.fuelType}</p>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon className="mr-1 text-gray-400" icon={faDroplet} />
              <p className="text-sm text-gray-400">{car.colorName}</p>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                className="mr-1 text-gray-400"
                icon={faCalendarDays}
              />
              <p className="text-sm text-gray-400">{car.year}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold">
              {car.price}.00$/
              <span className="text-gray-400 font-bold text-sm">days</span>{" "}
            </p>
            <Link
              to={`/cardetail/${car.id}`}
              className="border px-4 py-2 rounded-lg bg-blue-600 text-white font-bold text-sm uppercase"
            >
              Rent now
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
