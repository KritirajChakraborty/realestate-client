import React from "react";

export default function CreateLisitng() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a listing
      </h1>
      <form className="flex flex-col  sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="border p-3 rounded-lg"
              maxLength="50"
              minLength="10"
              required
            />
            <textarea
              type="text"
              placeholder="Description"
              name="description"
              className="border p-3 rounded-lg"
              maxLength="100"
              minLength="20"
              required
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              className="border p-3 rounded-lg"
              maxLength="70"
              minLength="10"
              required
            />
            <div className="flex flex-wrap gap-6">
              <div className="flex gap-2">
                <input type="checkbox" name="sale" className="w-5" />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" name="rent" className="w-5" />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" name="furnished" className="w-5" />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" name="parking" className="w-5" />
                <span>Parking</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" name="offers" className="w-5" />
                <span>Offers</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  name="bedrooms"
                  max="10"
                  min="1"
                  className="border border-gray-300 p-3 rounded-lg"
                />
                <p>Beds</p>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  name="bathrooms"
                  max="10"
                  min="1"
                  className="border border-gray-300 p-3 rounded-lg"
                />
                <p>Bathrooms</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <p>Regular price</p>
                  <span className="text-xs">(₹ / month)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <p>Discounted price</p>
                  <span className="text-xs">(₹ / month)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 text-white border border-green-700 bg-green-700 rounded uppercase hover:bg-green-900 disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
