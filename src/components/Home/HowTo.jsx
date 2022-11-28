import React from "react";

const data = {
  sub_heading: "How It Works",
  heading: "How To Participate",
  workData: [
    {
      id: 1,
      icon: "icons icon-drawer text-effect",
      title: "Submit KYC",
      content:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores non provident.",
    },
    {
      id: 2,
      icon: "icons icon-wallet text-effect",
      title: "Verify Wallet",
      content:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quasi architecto.",
    },
    {
      id: 3,
      icon: "icons icon-fire text-effect",
      title: "Start Staking",
      content:
        "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas.",
    },
  ],
};

export default function HowTo() {
  return (
    <section className="work-area" id="howto">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Intro */}
            <div className="intro d-flex justify-content-between align-items-end mb-4">
              <div className="intro-content">
                <span className="intro-text">{data.sub_heading}</span>
                <h3 className="mt-3 mb-0">{data.heading}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="row items">
          {data.workData.map((item, idx) => {
            return (
              <div key={`wd_${idx}`} className="col-12 col-sm-6 col-lg-4 item">
                {/* Single Work */}
                <div className="single-work">
                  <i className={item.icon} />
                  <h4>{item.title}</h4>
                  <p>{item.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
