"use client"
import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { Pais } from '../interfaces/Pais';
import './page.module.css'
import { Loader } from 'rsuite';
import IconButton from '@/shared/IconButton';
import Swal from 'sweetalert2';

export default function Home() {
  const [data, setData] = useState<Pais[]>([])
  const [termino, setTermino] = useState<string>('');
  const [loading, setLoading] = useState<Boolean>(false)

  const apiUrl = 'https://restcountries.com/v2';

  const getInformation = async () => {
    if (termino) {
      setLoading(true)
      axios({
        method: 'GET',
        url: `${apiUrl}/name/${termino}`
      }).then((res) => {
        setData(res.data)
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        setLoading(false)
      })
    }else{
      Swal.fire({
        title: 'Buscar País',
        text: 'Debe ingresar un término de busqueda',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#119627'
      })
    }
  }

  const formatNumber = (number: number): string => {
    // Convierte el número a una cadena y elimina espacios en blanco
    const numberString = number.toString().trim();

    // Verifica si el número tiene decimales
    const hasDecimal = numberString.includes(".");

    // Separa la parte entera de la parte decimal (si existe)
    let [integerPart, decimalPart] = hasDecimal ? numberString.split(".") : [numberString, ""];

    // Agrega comas a la parte entera
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Une la parte entera y la parte decimal (si existe)
    const formattedNumber = hasDecimal ? `${integerPart}.${decimalPart}` : integerPart;

    return formattedNumber;
  }

  const createRow = (pais: Pais) => {
    return (
      <tr>
        <th>
          <img style={{ maxWidth: 55 }} src={pais.flag} />
        </th>
        <th>{pais.name}</th>
        <th>{pais.region}</th>
        <th>{formatNumber(pais.population)}</th>
        <th>{pais.numericCode}</th>
      </tr>
    )
  }

  if (loading) {
    return (<Loader backdrop content="...Cargando" vertical size='lg' />)
  }

  console.log(loading, data)

  return (
    <div className="container mt-5">
      <h3 className='text-center'>Paises App</h3>
      <hr />
      <div className='row'>
        <div className='col-xl-11 col-lg-11 col-md-10 col-sm-8 col-xs-12'>
          <input type='text' className='form-control' placeholder='Ingrese un término de busqueda' value={termino} onChange={(e) => setTermino(e.target.value)} />
        </div>
        <div className='col-xl-1 col-lg-1 col-md-2 col-sm-4 col-xs-12'>
          <IconButton type='text' className='btn btn-success' onClick={() => getInformation()} icon="bi bi-search" title="Buscar" />
        </div>
      </div>
      <hr />
      <div className='mt-5'>
        <table className='table table-striped shadow'>
          <thead className='table-dark'>
            <tr>
              <th>Bandera</th>
              <th>Nombre</th>
              <th>Region</th>
              <th>Población</th>
              <th>Código</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((pais: Pais) => {
                return (
                  createRow(pais)
                )
              })
            }
          </tbody>
          <tfoot className='table-dark'>
            <tr>
              <th>Bandera</th>
              <th>Nombre</th>
              <th>Region</th>
              <th>Población</th>
              <th>Código</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
