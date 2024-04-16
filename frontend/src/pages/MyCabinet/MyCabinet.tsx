import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { AuthClient } from "@/context/AuthProvider";
import { enqueueSnackbar } from "notistack";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const schemaAccountDetails = z.object({
  fullName: z.string().trim().min(1, { message: "Это поле обязательно" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Это поле обязательно" })
    .email({ message: "Неправильная почта" }),
});

const schemaPassword = z.object({
  password: z
    .string()
    .min(6, { message: "Пароль должен быть не менее 6 символов" }),
  password2: z
    .string()
    .min(6, { message: "Пароль должен быть не менее 6 символов" }),
});

type SchemaPasswordType = z.infer<typeof schemaPassword>;
type SchemaAccountDetailsType = z.infer<typeof schemaAccountDetails>;

const MyCabinet = () => {
  const { isUserloggedIn, handleDeleteAccount } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserloggedIn) {
      navigate("/login");
    }
  }, [isUserloggedIn, navigate]);

  const form1 = useForm<SchemaAccountDetailsType>({
    resolver: zodResolver(schemaAccountDetails),
  });

  const form2 = useForm<SchemaPasswordType>({
    resolver: zodResolver(schemaPassword),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthClient.get("/users");
        console.log(response.data);
        form1.setValue("fullName", response.data.fullName);
        form1.setValue("email", response.data.email);
      } catch (error) {
        console.error("Error fetching data:", error);
        enqueueSnackbar("Ошибка при загрузке данных", { variant: "error" });
      }
    };

    fetchData();
  }, []);

  const onSubmitAccountDetails = async (data: SchemaAccountDetailsType) => {
    try {
      const response = await AuthClient.put("/users/update/general", {
        fullName: data.fullName,
        email: data.email,
        imageId: 1,
      });
      console.log(response.data);
      enqueueSnackbar("Данные успешно обновлены", { variant: "success" });
    } catch (error) {
      console.error("Error updating data:", error);
      enqueueSnackbar("Ошибка при обновлении данных", { variant: "error" });
    }
  };

  const onSubmitPassword = async (data: SchemaPasswordType) => {
    if (data.password !== data.password2) {
      form2.setError("password2", {
        type: "manual",
        message: "Пароли не совпадают",
      });

      enqueueSnackbar("Пароли не совпадают", { variant: "error" });
      return;
    }

    console.log(data.password);

    try {
      const response = await AuthClient.put("/users/update/password", {
        password: data.password,
      });
      console.log(response.data);
      console.log(data);
      enqueueSnackbar("Пароль успешно обновлен", { variant: "success" });
    } catch (error) {
      console.error("Error updating password:", error);
      enqueueSnackbar("Ошибка при обновлении пароля", { variant: "error" });
    }
  };

  const handleOnClickDeteteAccount = () => {
    handleDeleteAccount();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex flex-col items-center bg-white max-w-[850px] py-[52px] px-[90px] rounded-[20px] mx-auto mb-[5rem]">
      <h1 className="font-bold text-[30px] text-[#333333] mb-11">
        Личные данные
      </h1>
      <form
        onSubmit={form1.handleSubmit(onSubmitAccountDetails)}
        className="w-full flex flex-col mb-24"
      >
        <div className="mb-10">
          <div className="flex justify-between items-center mb-[3px]">
            <label
              htmlFor="fullName"
              className="ml-[2px] text-[#333333] text-2xl text-left self-start"
            >
              Ваше Имя
            </label>
            {form1.formState.errors.fullName && (
              <p className="text-[#FF0000] font-medium text-lg leading-8 self-start">
                {form1.formState.errors.fullName.message}
              </p>
            )}
          </div>
          <input
            {...form1.register("fullName")}
            type="text"
            id="fullName"
            placeholder="*Имя Фамилия*"
            className="w-full border-[#C0E3E5] solid border-[2.8px] rounded-[20px] px-7 py-3 text-[#979797] text-2xl"
          />
        </div>
        <div className="mb-10">
          <div className="flex justify-between items-center mb-[3px]">
            <label
              htmlFor="email"
              className="ml-[2px] text-[#333333] text-2xl text-left self-start"
            >
              Ваш E-mail
            </label>
            {form1.formState.errors.email && (
              <p className="text-[#FF0000] font-medium text-lg leading-8 self-start">
                {form1.formState.errors.email.message}
              </p>
            )}
          </div>
          <input
            {...form1.register("email")}
            placeholder="example@gmail.com"
            type="email"
            id="email"
            className="w-full border-[#C0E3E5] solid border-[2.8px] rounded-[20px] px-7 py-3 text-[#979797] text-2xl appearance-none"
          />
        </div>
        {/* <div className="mb-3 w-full self-stretch">
                    <label
                        htmlFor="formFile"
                        className="ml-[2px] mb-2 block text-[#333333] text-2xl text-left self-start"
                    >
                        Загрузите аватарку
                    </label>
                    {form1.formState.errors.fullName && (
                        <p className="text-[#FF0000] font-medium text-lg leading-8 self-start">
                            {form1.formState.errors.fullName.message}
                        </p>
                    )}
                    <input
                        {...form1.register("image")}
                        className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                        type="file"
                        id="image"
                    />
                </div> */}
        <button className="border-none bg-transparent text-[#979797] text-[20px] leading-[34px] mt-7">
          Сохранить
        </button>
      </form>

      <h1 className="font-bold text-[30px] text-[#333333] mb-11">Пароль</h1>
      <form
        onSubmit={form2.handleSubmit(onSubmitPassword)}
        className="w-full flex flex-col mb-[100px]"
      >
        <div className="mb-10">
          <div className="flex justify-between items-center mb-[3px]">
            <label
              htmlFor="email"
              className="ml-[2px] text-[#333333] text-2xl text-left self-start"
            >
              Новый Пароль
            </label>
            {form2.formState.errors.password && (
              <p className="text-[#FF0000] font-medium text-lg leading-8 self-start">
                {form2.formState.errors.password.message}
              </p>
            )}
          </div>
          <input
            {...form2.register("password")}
            type="password"
            id="password"
            className="w-full border-[#C0E3E5] solid border-[2.8px] rounded-[20px] px-7 py-3 text-[#979797] text-2xl"
          />
        </div>
        <div className="mb-2">
          <div className="flex justify-between items-center mb-[3px]">
            <label
              htmlFor="password"
              className="ml-[2px] text-[#333333] text-2xl text-left self-start"
            >
              Повторите пароль
            </label>
            {form2.formState.errors.password2 && (
              <p className="text-[#FF0000] font-medium text-lg leading-8 self-start">
                {form2.formState.errors.password2.message}
              </p>
            )}
          </div>
          <input
            {...form2.register("password2")}
            type="password"
            id="password2"
            className="w-full border-[#C0E3E5] solid border-[2.8px] rounded-[20px] px-7 py-3 text-[#979797] text-2xl appearance-none"
          />
        </div>
        <button className="border-none bg-transparent text-[#979797] text-[20px] leading-[34px] mt-7">
          Сохранить
        </button>
      </form>

      <Button
        onClick={handleOnClickDeteteAccount}
        className="bg-[#FF0000] font-normal text-[25px] px-[72px] py-4"
      >
        Удалить аккаунт
      </Button>
    </div>
  );
};

export default MyCabinet;
