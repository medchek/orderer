import { emailRegex, phoneRegex } from "./patterns";

type validationFunction = (value: string) => string | undefined;

// export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

interface OrderFormValidator {
  name: validationFunction;
  surname: validationFunction;
  phone: validationFunction;
  email: validationFunction;
  address: validationFunction;
  wilaya: validationFunction;
  town: validationFunction;
}
interface DashboardAddProductFormValidator {
  name: validationFunction;
  price: validationFunction;
  stock: validationFunction;
  images: validationFunction;
  discount: validationFunction;
}

export const orderFormValidators: OrderFormValidator = {
  name: (val) => {
    const value = val.trim();
    if (value) {
      if (value.length < 3 || value.length > 40)
        return "Le prénom doit être entre 3 et 40 caractères";
      if (/\d/gi.test(value))
        return "Le prénom ne peut pas contenir des chiffres";
    }
  },
  surname: (val) => {
    const value = val.trim();

    if (value) {
      if (value.length < 3 || value.length > 40)
        return "Le nom doit être entre 3 et 40 caractères";
      if (/\d/gi.test(value)) return "Le nom ne peut pas contenir des chiffres";
    }
  },
  phone: (val) => {
    if (!val) return;

    const value = val.trim();
    if (!phoneRegex.test(value)) {
      return "Le numéro de téléphone n'est pas valide";
    }
  },
  email: (val) => {
    const value = val.trim();
    if (!value) return;
    const isValidEmail = emailRegex.test(value);
    if (!isValidEmail) {
      return "Veuillez entrer un email valide";
    }
  },
  address: (val) => {
    if (!val) return;

    const value = val.trim();

    if (value.length <= 10 || value.length > 200)
      return "L'adresse doit être au minimum 10 caractères";
  },
  wilaya: (val) => {
    if (!val) return;

    const value = val.trim();

    if (value == "0" || value == "") {
      return "Aucune wilaya n'a été selectionnée";
    }
  },
  town: (val) => {
    if (!val) return;

    const value = val.trim();

    if (value == "0" || value == "") {
      return "Aucune commune n'a été selectionnée";
    }
  },
};

export const addProductValidators: DashboardAddProductFormValidator = {
  name: (val: string) => {
    const value = val.trim();

    if (value.length < 2 && value.length > 150)
      return "Le nom du produit doit être entre 2 et 150 caracères";
  },
  price: (val: string) => {
    const value = parseInt(val.trim());

    if (Number.isFinite(val) || value < 0)
      return "Le prix doit être un nombre valide";
  },
  discount: (val: string) => {
    const value = parseInt(val.trim());
    if (value < 0 || value > 100) return "Pourcentage de réduction invalide";
  },
  stock: (val: string) => {
    const value = parseInt(val.trim());

    if (Number.isFinite(val) || value < 0 || value > 1000000000000)
      return "Le stock doit être un nombre valide";
  },
  images: (val: string) => {
    const url = val.trim();

    if (url.length) {
      const fbUrlImageRegex =
        /https:\/\/scontent\.[a-z0-9.-]*\.fna\.fbcdn\.net\/v\/[a-z0-9.-]*\/[0-9a-z_]*\.jpg\?[A-Za-z0-9=_&.-]*/gi;
      if (!fbUrlImageRegex.test(url))
        return "Le lien de l'image doit pointé à une image facebook";
    }
  },
};
