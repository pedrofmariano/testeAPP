import React from 'react';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  StyleSheet,
  Picker
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import api from '../services/api';

const validationSchema = yup.object().shape({
  nome: yup
    .string()
    .required('Esse campo é obrigatório!')
    .min(3, 'Precisa conter pelo menos 3 caracteres'),
  cpf: yup
    .string()
    .required('Esse campo é obrigatório!'),
  email: yup
    .string()
    .email('O email digitado não é válido')
    .required('Esse campo é obrigatório!')
})


function testeCpf(cpf){
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;
     
  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
   
  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

export default () => (
  <ScrollView style={styles.container}>
    <Formik
      initialValues={{ 
      nome: '',
      cpf: '',
      logradouro: `RUA MÁRIO RENNO GOMES`,
      numero: `16`,
      complemento: `casa`,
      cep: `31742-159`,
      telefone: `(31)34355560`,
      email: '',
      cidade: `BH`,
      bairro: `belo horiuzona`,
      senha: `5874696871`,
      nomepai: `um dois tres`,
      nomemae: `quatro cinco seis`,
      estadocivil: `solteiro`,
      sexo: `M`,
      dt_nascimento: `2019-05-30`,
      horario: `manha`,
      rg: '',
      orgaoexpedidor: '',
      periodoano: `2`,
      previsaoformatura: `2019`,
      curso_id: 11150,
      escola_id: 5488,
      dt_cadastro: `2019-05-30`,
      uf: `MG`,
      idade: 2450,
      estagiario_ativo: ``,
      dt_atualizacao: `2019-05-30`,
      periodo: 1,
      ano: 1997,
      previsao_semestre: 5,
      previsao_ano: 2,
      previsao_mes: 20,
      deficiencia: `N`,
      deficiencia_descricao: `teste`,
      telefone1: `31994430008`,
      telefone2: `3134355560`,
      ctps: `1235582`,
     }}
      onSubmit={(values, actions) => { 
        alert(JSON.stringify(values));
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 1000);
      }}
      validationSchema={validationSchema}
    >
      {formikProps => (
        <React.Fragment>
          <Text style={styles.ttitleInput}>Nome</Text>
          <TextInput
            style={styles.input}
            onChangeText={formikProps.handleChange('nome')}
          />
          <Text style={styles.textErro}>{formikProps.errors.nome}</Text>
          
          <Text style={styles.ttitleInput}>CPF</Text>
          <TextInput
            style={styles.input}
            keyboardType='number-pad'
            onChangeText={formikProps.handleChange('cpf')}
          />
          <Text style={styles.textErro}>{formikProps.errors.cpf}</Text>
         
          <Text style={styles.ttitleInput}>RG</Text>
          <TextInput
            style={styles.input}
            keyboardType='number-pad'
            onChangeText={formikProps.handleChange('rg')}
          />
          <Text style={styles.textErro}>{formikProps.errors.rg}</Text>
          
          <Text style={styles.ttitleInput}>Orgão Expedidor</Text>
          <TextInput
            style={styles.input}
            onChangeText={formikProps.handleChange('orgaoexpedidor')}
          />
          <Text style={styles.textErro}>{formikProps.errors.orgaoexpedidor}</Text>
          
          <Text style={styles.ttitleInput}>E-mail</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={formikProps.handleChange('email')}
          />
          <Text style={styles.textErro}>{formikProps.errors.email}</Text>



          {formikProps.isSubmitting ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity
                 onPress={ //formikProps.handleSubmit
                    async () => {
                     await api.post('/estudantes', formikProps.values)
                }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          )}
        </React.Fragment>
      )}
    </Formik>
  </ScrollView>
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 25,
      marginTop: 20
    },
    input: {
      height: 46,
      borderWidth: 1,
      borderColor: '#000',
      backgroundColor: '#FFF'

    },
    ttitleInput: {
      marginBottom: 3,
    },
    textErro: {
        color: 'red'
    },
    button: {
        height: 46,
        backgroundColor: '#32CD32',
        borderRadius: 4,
        marginTop: 30,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20
    }
})