import Entrypoint from './app';

Entrypoint()
    .then(s => {
        const {server,instance} = s;
        server.listen(instance?.port,() => console.log(`Listening on ${process.env.PORT}`));
    })
    .catch(err => console.error(err));



