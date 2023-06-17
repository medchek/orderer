type validationFunction = (value: string) => string | undefined;

interface OrderFormValidator {
  name: validationFunction;
  surname: validationFunction;
  phone: validationFunction;
  email: validationFunction;
  address: validationFunction;
  wilaya: validationFunction;
}

export const orderFormValidators: OrderFormValidator = {
  name: (value) => {
    if (value) {
      if (value.length < 3 || value.length > 40)
        return "Le prénom doit être entre 3 et 40 caractères";
      if (/\d/gi.test(value))
        return "Le prénom ne peut pas contenir des chiffres";
    }
  },
  surname: (value) => {
    if (value) {
      if (value.length < 3 || value.length > 40)
        return "Le nom doit être entre 3 et 40 caractères";
      if (/\d/gi.test(value)) return "Le nom ne peut pas contenir des chiffres";
    }
  },
  phone: (value) => {
    if (!/^0[756]{1}[0-9]{8}$/.test(value))
      return "Le numero de téléphone n'est pas valide";
  },
  email: (value) => {
    if (value) {
      if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi.test(
          value
        )
      ) {
        return "Veuillez entrer un email valide";
      }
    }
  },
  address: (value) => {
    if (value.length <= 10 || value.length > 200)
      return "L'adresse doit être au minimum 10 caractères";
  },
  wilaya: (value) => {
    if (value == "0") {
      return "Aucune wilaya n'a été selectionnée";
    }
  },
};
