import {Textarea, Field, IconButton, HStack, Text} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import type {FieldValues} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {LuBotMessageSquare} from "react-icons/lu";

const schema = z.object({
    prompt: z
        .string()
        .min(10, { message: 'Prompt to bot should be at least 10 characters.'})
        .max(220, { message: 'Maximum allowed prompt length is 220 characters.'}),
});

interface Props {
    onPromptSubmit: (prompt: string) => void;
}

const NasaBotForm = ({ onPromptSubmit }: Props) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm({
        resolver: zodResolver(schema),
        mode: "onTouched",
        reValidateMode: "onChange"
        });

    const onSubmit = (data: FieldValues) => {
        onPromptSubmit(data.prompt as string);
    }

    return (
        <form onSubmit={handleSubmit(data => { onSubmit(data); reset(); })}>
            <Field.Root mb="6">
                <Textarea
                    {...register("prompt")}
                    id="prompt"
                    height="100px"
                    resize="none"
                    borderColor="pink.400"
                    outline="none"
                />
            </Field.Root>

            <HStack>
                <IconButton me="3" type="submit" bg="pink.600" disabled={!isValid} rounded="full">
                    <LuBotMessageSquare />
                </IconButton>
                {errors.prompt && <Text color="pink.400" textStyle="sm">{errors.prompt.message}</Text>}
            </HStack>
        </form>
)
}
export default NasaBotForm
