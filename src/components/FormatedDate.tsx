function FormatedDate({ dateString }: any) {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const formatedDate = date.toLocaleDateString('nl-BE', options)
    return (
        <time dateTime={dateString}>{formatedDate}</time>
    )
}

export default FormatedDate;