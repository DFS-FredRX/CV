import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDTO {

    @IsString()
    @IsNotEmpty({ message: "Le prénom est obligatoire." })
    @MaxLength(50)
    firstname: string

    @IsString()
    @IsNotEmpty({ message: "Le nom est obligatoire." })
    @MaxLength(50)
    lastname: string

    @IsString()
    @IsNotEmpty({ message: "Le nom d'utilisateur est obligatoire." })
    @MinLength(3, { message: "Le nom d'utilisateur doit faire au moins 3 caractères." })
    @MaxLength(50)
    username: string

    @IsEmail({}, { message: "L'adresse email n'est pas valide." })
    @IsNotEmpty({ message: "L'adresse email est obligatoire." })
    @MaxLength(100)
    email: string

    @IsString()
    @IsNotEmpty({ message: "Le mot de passe est obligatoire." })
    @MinLength(8, { message: "Le mot de passe doit faire au moins 8 caractères." })
    @MaxLength(32)
    password: string
    
}