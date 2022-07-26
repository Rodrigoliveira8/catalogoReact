import {useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './index.scss'

import LoadingBar from 'react-top-loading-bar'

export default function Index() {
    const [ email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);

    const navigate = useNavigate();
    const ref = useRef();

    async function entrarClick() {
        ref.current.continuousStart();
        

        try {const r = await axios.post('http://localhost:5000/usuario/login', {
            email: email,
            senha: senha
        });

        setTimeout(() => {
            navigate('/admin'); 
        }, 3000);
           
    } catch (err) {
        ref.current.complete();
            if (err.response.status === 401) {
                setErro(err.response.data.erro)
            }
        }
        
    }
    return (
        <main className='page page-login'>
            <LoadingBar color='green' ref={ref} />

            <section className="box-login">

                <div className="bem-vindo">
                    <img src="/assets/images/logo.svg" alt="logo" />
                    <h1> Seja Bem-vindo!</h1>
                </div>

                <div>
                    <div className='form-row'>
                        <label>E-mail:</label>
                        <input type='text' placeholder='Informe seu e-mail' value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='form-row'>
                        <label>Senha:</label>
                        <input type='password' placeholder='***' value={senha} onChange={e => setSenha(e.target.value)} />
                    </div>
                    <div className='form-entrar'>
                        <button className='btn-black' onClick={entrarClick} disabled={carregando} >ENTRAR</button> 
                    </div>
                    <div className='form-entrar invalido'>
                        {erro}
                    </div>
                </div>

            </section>
        </main>
    )
}

