import { IsString, IsInt, IsBoolean, MaxLength, MinLength} from 'class-validator';

export class CreateTodoDto {
    @IsString({
        message: '제목은 문자열로만 가능합니다'
    })
    @MinLength(6, {
        message: '제목은 $constraint1 자이상, 입력된 글자: $value' 
    })
    @MaxLength(30, {
        message: "너무 길다"
    })
    todo: string;

    @IsBoolean({
        message: 'Boolean 만 가능'
    })
    is_done: boolean;
}