import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const UserAddresses = ({ addresses }) => {
  return addresses?.map((address) => (
    <Link href={`/address/${address._id}`} key={address._id}>
      <div className="mb-5 gap-4">
        <figure className="w-full flex align-center bg-gray-100 p-4 rounded-md cursor-pointer">
          <div className="mx-3">
            <span className="flex items-center justify-center text-white w-12 h-12 bg-black rounded-full shadow">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </span>
          </div>
          <figcaption className="text-gray-600">
            <p>
              {address.street} <br /> {address.city}, {address.state},{" "}
              {address.zipCode}, {address.country}
              <br />
              Phone no: {address.phoneNo}
            </p>
          </figcaption>
        </figure>
      </div>
    </Link>
  ));
};

export default UserAddresses;
