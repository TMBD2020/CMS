<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>CMS</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"/>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
   *{
     margin: 0;
     padding: 0;
     box-sizing: border-box;
     text-decoration: none;
     font-family: 'Poppins', sans-serif;
   }
   body{
     display: flex;
     align-items: center;
     justify-content: center;
     min-height: 100vh;
     background: #f7f7f7;
     padding: 0 10px;
   }
   .wrapper{
     background: #ffffff;
     max-width: 450px;
     width: 100%;
     border-radius: 16px;
     box-shadow: 0 0 128px 0 rgba(0,0,0,0.1),
                 0 32px 64px -48px rgba(0,0,0,0.5);
   }
   
   /* Login & Signup Form CSS Start */
   .form{
     padding: 25px 30px;
   }
   .form header{
     font-size: 25px;
     font-weight: 600;
     padding-bottom: 10px;
     border-bottom: 1px solid #e6e6e6;
   }
   .form form{
     margin: 20px 0;
   }
   .form form .error-text{
     color: #721c24;
     padding: 8px 10px;
     text-align: center;
     border-radius: 5px;
     background: #f8d7da;
     border: 1px solid #f5c6cb;
     margin-bottom: 10px;
     display: none;
   }
   .form form .name-details{
     display: flex;
   }
   .form .name-details .field:first-child{
     margin-right: 10px;
   }
   .form .name-details .field:last-child{
     margin-left: 10px;
   }
   .form form .field{
     display: flex;
     margin-bottom: 10px;
     flex-direction: column;
     position: relative;
   }
   .form form .field label{
     margin-bottom: 2px;
   }
   .form form .input input{
     height: 40px;
     width: 100%;
     font-size: 16px;
     padding: 0 10px;
     border-radius: 5px;
     border: 1px solid #ccc;
   }
   .form form .field input{
     outline: none;
   }
   .form form .image input{
     font-size: 17px;
   }
   .form form .button input{
     height: 45px;
     border: none;
     color: #fff;
     font-size: 17px;
     background: #333;
     border-radius: 5px;
     cursor: pointer;
     margin-top: 13px;
   }

   .form form .button input:hover{
    background-color: #e63636;
    transform: scale(1.0);

   }
   .form form .field i{
     position: absolute;
     right: 15px;
     top: 70%;
     color: #ccc;
     cursor: pointer;
     transform: translateY(-50%);
   }
   .form form .field i.active::before{
     color: #333;
     content: "\f070";
   }
   .form .link{
     text-align: center;
     margin: 10px 0;
     font-size: 15px;
   }
   .form .link a{
     color: #000000;
   }
   .form .link a:hover{
     text-decoration: underline;
   }
   .logo{
       display: block;
       margin: 0 auto;
       width: 150px; 
   }
   .sponser p{
    margin-top: 25px;
   text-align: center;
   text-transform: uppercase;
   }
    </style>

</head>

<body>
    <div class="wrapper">
      <section class="form login">
        <div class="logo">
            <img src="{{asset('assets/images/defaultLogo.png')}}" class="" style="width: 100px;" alt="logo">
        </div>
        @if (session()->has('error'))
        <div class="alert alert-danger" role="alert">
          <strong style="color: red;">{{session('error')}}</strong>
        </div>
          @endif
          <form method="POST" action="{{ route('register') }}">
            @csrf
            <div class="field input">
               
                <input id="name" type="text"placeholder="Enter your Name" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>
                @error('name')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
            </div>

            <div class="field input">
                
                <input id="company_name" type="text"placeholder="Enter Company name" class="form-control @error('company_name') is-invalid @enderror" name="company_name" value="{{ old('company_name') }}" required autocomplete="company_name" autofocus>
                @error('company_name')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
            </div>

            <div class="field input">        
                <input id="number" type="number"placeholder="Enter your number" class="form-control @error('number') is-invalid @enderror" name="number" value="{{ old('number') }}" required autocomplete="number" autofocus>
                @error('number')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
                @enderror
            </div>
      
          <div class="field input">
            <input id="email" type="email"placeholder="Enter your email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
            @error('email')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>
  
          <div class="field input">
            <input id="password" type="password" placeholder="Create Your Software Password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">
            @error('password')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
            <i class="fas fa-eye"></i>
          </div>

          <div class="field input">
            <input id="password-confirm" type="password" placeholder="Confirm Your Software Password" class="form-control" name="password_confirmation" required autocomplete="new-password">
         
            <i class="fas fa-eye"></i>
          </div>

          <div class="field button">
            <input type="submit" value="Subscribe">
          </div>
        </form>
        @if (Route::has('password.request'))
        <div class="link"><a href="{{ route('password.request') }}">Forgot Your Password?</a></div>
        @endif
        
        @if (Route::has('register'))
        <div class="link"><a href="{{ route('login') }}">Already a member?</a></div>
        @endif
      <div class="sponser">
        <p>Powered By <b>Tech Makers BD</b></p>
      </div>
      </section>
    </div>
    
    <script src="{{asset('assets/login_js/pass-show-hide.js')}}"></script>
  </body>
  </html>
  

 