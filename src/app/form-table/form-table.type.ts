export type FTDict = {
  title: string;
  actions: {
    slide: string;
    shuffle: string;
  };
  form: {
    title: string;
    titleOptions: {
      mr: string;
      mrs: string;
      ms: string;
    };
    firstname: string;
    lastname: string;
    birthday: string;
    nationality: string;
    nationalityOptions: {
      thai: string;
      french: string;
      american: string;
    };
    cityzenId: string;
    gender: string;
    genderOptions: {
      male: string;
      female: string;
      unisex: string;
    };
    mobilePhone: string;
    mobilePhoneOptions: {
      thai: string;
    };
    passportNo: string;
    expectedSalary: string;
    name: string;
    manage: string;
    buttons: {
      reset: string;
      submit: string;
    };
  };
  table: {
    prev: string;
    next: string;
    selectAll: string;
    deleteSelected: string;
    edit: string;
    delete: string;
    manage: string;
  };
  formValidation: {
    required: {
      title: string;
      firstname: string;
      lastname: string;
      birthday: string;
      cityzenId: string;
      gender: string;
      mobilePhone: string;
      passportNo: string;
      expectedSalary: string;
    };
  };
};
