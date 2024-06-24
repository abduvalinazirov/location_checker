import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home__page pt-5">
      <div className="container">
        <div className="row">
          <div className="col-4">
            <Link to="/task1">
              <div class="card">
                <img src="/images/task1.jpg" alt="Task 1" className="card-img-top p-0" style={{ height: "200px", objectFit: "contain" }} />
                <div class="card-body">
                  <h5 class="card-title">Track chizish, Start va Finish nuqtalarni belgilash</h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-4">
            <Link to="/task2">
              <div class="card">
                <img src="/images/task2.jpg" alt="Task 2" className="card-img-top p-0" style={{ height: "200px", objectFit: "contain" }} />
                <div class="card-body">
                  <h5 class="card-title">Poligon chizish va ularni bir necha usul bilan o'zgartirish</h5>
                </div>
              </div>
            </Link>
          </div>
          {/* <div className="col-4">
            <Link to="/task3">
              <div class="card">
                <img src="/images/task3.jpg" alt="Task 3" className="card-img-top p-0" style={{ height: "200px", objectFit: "contain" }} />
                <div class="card-body">
                  <h5 class="card-title">Task 3</h5>
                </div>
              </div>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
