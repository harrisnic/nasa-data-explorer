import {Button, Textarea, Field} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import type {FieldValues} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const schema = z.object({
    prompt: z
        .string()
        .min(10, { message: 'Prompt to bot should be at least 10 characters.'})
        .max(220, { message: 'Maximum prompt length to bot is 220 characters.'}),
});

type BotFormData = z.infer<typeof schema>;

const NasaBotForm = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }} = useForm({resolver: zodResolver(schema), mode: "onTouched", reValidateMode: "onChange" });

    const onSubmit = (data: FieldValues) => {console.log(data)}

    return (
        <form onSubmit={handleSubmit(data => {
            onSubmit(data);
            reset();
        })}>

            <Field.Root mb="6">
                <Textarea {...register("prompt")} id="prompt" variant="subtle" placeholder="subtle" />
                {errors.prompt && <p>{errors.prompt.message}</p>}
            </Field.Root>

            <Button disabled={!isValid} type="submit">Submit</Button>

        </form>
    )
}
export default NasaBotForm
