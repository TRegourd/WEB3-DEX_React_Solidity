import React from "react";

const data = [
  {
    title: "Credits",
    content: [
      {
        name: "Breadcrumb",
        text: "Shubham Dhage",
        link: "https://unsplash.com/@theshubhamdhage?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
      },
      {
        name: "Hero",
        text: "Shubham Dhage",
        link: "https://unsplash.com/@theshubhamdhage?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
      },
      {
        name: "CryptoCats Collection",
        text: "Gentfy",
        link: "https://www.genfty.com/",
      },
      {
        name: "Hash Eyes Collection",
        text: "HashLips Art Engine",
        link: "https://hashlips.online/HashLips",
      },
    ],
  },
  {
    title: "Terms",
    content: [
      {
        name: "Editeur du site",
        text: "Ridge Coding, SAS au capital de 1000€ // Numéro de SIRET : 917 596 546 // RCS de Chambéry // Siège Social : 1837 route des Monts, 73230 Saint Alban Leysse // Téléphone : +33 (0)695025391 // Email : contact@ridgecoding.com",
        link: "https://www.ridgecoding.com",
      },
      {
        name: "Hébergeur du site",
        text: "Netlify, Inc., 44 Montgomery Street, Suite 300, San Francisco, California 94104. USA",
        link: "https://www.netlify.com/",
      },
    ],
  },
];

export default function Legals() {
  return (
    <section className="single featured post-details">
      <div className="container">
        <div className="row">
          {/* Main */}
          <div className="row">
            {data &&
              data.map((item) => {
                return (
                  <div key={item.title} className="col-12 align-self-center">
                    <h2 className="featured ml-0">{item.title}</h2>
                    {item.content.map((content) => {
                      return (
                        <>
                          <h6>{content.name}</h6>
                          <p>
                            {content.text}{" "}
                            <a
                              href={content.link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Link
                            </a>
                          </p>
                        </>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
