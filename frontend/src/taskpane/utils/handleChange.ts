export async function handleChange(event) {
    await Excel.run(async (context) => {
        await context.sync();        
        console.log("Change type of event: " + event.changeType);
        console.log("Address of event: " + event.address);
        console.log("Source of event: " + event.source);       
    });
}