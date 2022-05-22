export class CreateUserSubscriptionDto {
    readonly student: string;
    readonly course: string;
    readonly start_date: Date;
    readonly end_date: Date;
}
