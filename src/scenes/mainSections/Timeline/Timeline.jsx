import React from 'react'

const Timeline = () => (
  <section className="lg:flex lg:h-full">
    <div className="lg:w-3/4 lg:px-12 lg:py-8 relative">
      <div className="flex pb-4 border-b border-grey-lighter relative">
        <span className="w-8 mr-4">
          <img src="/static/images/033-boy.svg" alt="" className="w-8" />
        </span>

        <div className="flex-grow">
          <div className="mb-4 text-sm ">
            <p className="mb-1 text-purple-light">Promise Tochi</p>
            <p className="text-xs text-grey-darker">
              @1:25pm on the 23rd of Jan
            </p>
          </div>
          {/* <span className="inline-block p-4 text-sm">
            <i className="" />
            Add a picture
          </span> */}
          <form action="">
            <div className="relative">
              <textarea
                placeholder="Share a post or picture"
                name=""
                id=""
                rows="10"
                className="w-full h-48 px-6 py-4 py-8 roboto text-lg leading-normal text-grey-darker border-r-2 border-b-2 border-dotted border-grey-light lg:lt-shadow rounded-sm"
              />
              <button className="flex items-center absolute pin-b pin-l mb-4 ml-6 pr-1 bg-blue-lightest text-xs text-grey-darker">
                <i className="inline-block w-4 mr-1">
                  <img
                    src="/static/images/png.svg"
                    alt=""
                    className="w-auto h-full"
                  />
                </i>
                Add a picture
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="relative">
        <span className="absolute h-full pin-t pin-l ml-4 border-r border-grey-light border-dashed" />
        <ul className="list-reset relative">
          <li className="mt-8">
            <div className="flex">
              <span className="w-8 mr-4">
                <img
                  src="/static/images/011-woman-5.svg"
                  alt=""
                  className="w-8"
                />
              </span>

              <div className="flex-grow">
                <div className="mb-4 text-xs">
                  <p className="mb-1 text-purple-light">Janet Ola</p>
                  <p className=" text-grey-darker">
                    @1:25pm on the 23rd of Jan
                  </p>
                </div>
                <div className="w-full p-6 py-4 roboto text-lg leading-normal text-grey-darker bg-grey-lighter rounded-sm">
                  By default, flex items are laid out in the source order.
                  However, the order property controls the order in which they
                  appear in the flex container.
                </div>
              </div>
            </div>
          </li>
          <li className="mt-8">
            <div className="flex">
              <span className="w-8 mr-4">
                <img src="/static/images/033-boy.svg" alt="" className="w-8" />
              </span>

              <div className="flex-grow">
                <div className="mb-4 text-xs">
                  <p className="mb-1 text-purple-light">Janet Ola</p>
                  <p className=" text-grey-darker">
                    @1:25pm on the 23rd of Jan
                  </p>
                </div>
                <div className="w-full p-6 py-4 roboto text-lg leading-normal text-grey-darker bg-grey-lighter rounded-sm">
                  By default, flex items are laid out in the source order.
                  However, the order property controls the order in which they
                  appear in the flex container.
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <aside className="lg:w-1/4 lg:h-full lg:bg-grey-lightest">
      <div> </div>
    </aside>
  </section>
)

export default Timeline
