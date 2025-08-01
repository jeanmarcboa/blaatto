import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Link from "next/link";

const MailSuccess = () => {
  return (
    <>
      <Breadcrumb title={"Création de compte"} pages={["Création de compte"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="bg-white rounded-xl shadow-1 px-4 py-10 sm:py-15 lg:py-20 xl:py-25">
            <div className="text-center">
              <h2 className="font-bold text-green text-4xl lg:text-[45px] lg:leading-[57px] mb-5">
                Félicitations!
              </h2>

              <h3 className="font-medium text-dark text-xl sm:text-2xl mb-3">
                Votre compte a été crée avec succès
              </h3>

              <p className="max-w-[491px] w-full mx-auto mb-5">
                Veuillez consulter votre boîte mail.<br></br>Vous allez recevoir
                deux e-mails distincts :
              </p>
              <p className="max-w-[491px] w-full mx-auto mb-7.5">
                Le premier contient un code d&apos;activation à saisir. Le
                second contient un lien sur lequel vous devrez cliquer pour
                créer un nouveau mot de passe.
              </p>
              <p className="max-w-[491px] text-red w-full mx-auto mb-7.5">
                👉 Assurez-vous de bien vérifier vos courriers indésirables
                (spam) si vous ne voyez rien après quelques minutes.
              </p>

              <Link
                href="/signin"
                className="inline-flex items-center gap-2 font-medium text-white bg-green py-3 px-6 rounded-md ease-out duration-200 hover:bg-green-dark"
              >
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6654 9.37502C17.0105 9.37502 17.2904 9.65484 17.2904 10C17.2904 10.3452 17.0105 10.625 16.6654 10.625H8.95703L8.95703 15C8.95703 15.2528 8.80476 15.4807 8.57121 15.5774C8.33766 15.6742 8.06884 15.6207 7.89009 15.442L2.89009 10.442C2.77288 10.3247 2.70703 10.1658 2.70703 10C2.70703 9.83426 2.77288 9.67529 2.89009 9.55808L7.89009 4.55808C8.06884 4.37933 8.33766 4.32586 8.57121 4.42259C8.80475 4.51933 8.95703 4.74723 8.95703 5.00002L8.95703 9.37502H16.6654Z"
                    fill=""
                  />
                </svg>
                Connectez-vous
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MailSuccess;
