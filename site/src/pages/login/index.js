import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import storage from 'local-storage';
import axios from 'axios';
import './index.scss'
import { login } from '../../api/usuarioApi.js';

export default function Index() {
    const [ email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (storage('usuario-logado')) {
            navigate('/admin')
        }
    }, [])

    async function entrarClick() {
        setCarregando(true);

        try {
        const r = await login(email, senha);
        
        storage('usuario-logado', r)
        
        setTimeout(() => {
            navigate('admin'); 
        }, 3000);
           
    } catch (err) {
        setCarregando(false);
            if (err.response.status === 401) {
                setErro(err.response.data.erro)
            }
        }
        
    }
    return (
        <main className='page page-login'>
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
                        <button className='btn-black' onClick={entrarClick} disabled= {carregando}>ENTRAR</button> 
                    </div>
                    <div className='form-entrar invalido'>
                        {erro}
                    </div>
                </div>

            </section>
        </main>
    )
}

