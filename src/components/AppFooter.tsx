import React from "react";
import { Footer, FooterCopyright, FooterDivider, FooterLink, FooterLinkGroup } from "flowbite-react";

const AppFooter: React.FC = () => {
    return (
        <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center space-x-3">
            <img
                src="https://flowbite.com/docs/images/logo.svg"
                alt="Flowbite Logo"
                className="h-8"
            />
            <span className="text-xl font-semibold dark:text-white text-black">Expense Tracker</span>
          </div>
          <FooterLinkGroup>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Licensing</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <FooterCopyright href="#" by="ExpenseX™" year={2025} />
      </div>
    </Footer>
    );
}

export default AppFooter;
