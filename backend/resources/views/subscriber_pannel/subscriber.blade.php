<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CMS ::</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <style>
        body, html {
            height: 100%;
            margin: 0;
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }
        .bg {
            background-image: url('assets/images/cms-bg.png');
            height: 100%;
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            transition: filter 0.3s ease-in-out;
        }

        .blurred {
            filter: blur(8px);
            -webkit-filter: blur(8px);
        }

        .popup {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 300px;
            background-color: #ffffff;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            text-align: center;

            animation: fadeIn 0.2s ease-in-out;
        }
        .popup h2 {
            margin: 0;
            font-size: 50px;
            color: #e63636;
        }
        .popup p {
            margin: 13px 0 23px;
            font-size: 25px;
            color: #000000;
        }
        .popup button {
            padding: 10px 20px;
            background-color: #000000;
            color: #ffffff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            padding: 25px;
        }
        .popup button:hover {
            background-color: #e63636;;
        }
        .popup i{
            margin: 13px 0 23px; 
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @media (max-width: 600px) {
            .popup {
                width: 90%;
                padding: 15px;
                font-size: 14px;
            }
            .popup h2 {
                font-size: 18px;
            }
            .popup button {
                font-size: 14px;
                padding: 8px 16px;
            }
        }
    </style>
</head>
<body>
    <div class="bg" id="background"></div>
    <div class="popup" id="congratsPopup">
        <h2>Congratulations!</h2>
        <p>Thanks for signing up for our service. <br> Our support person will call you soon.</p>
        <span>Helpline Number</span>
        <i class="fa fa-phone fa-1xl" aria-hidden="true">
            <span>018xxxxx</span>
        </i>
        <br>
        <button href="{{route('logout')}}" onclick="event.preventDefault();
        document.getElementById('logout-form').submit();">Logout</button>
        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
        @csrf
        </form>
    </div>

    <script>
        function showPopup() {
            document.getElementById('congratsPopup').style.display = 'block';
            document.getElementById('background').classList.add('blurred');
        }

        function closePopup() {
            document.getElementById('congratsPopup').style.display = 'none';
            document.getElementById('background').classList.remove('blurred');
        }

        // Show the popup after 2 seconds for demonstration purposes
        setTimeout(showPopup, 1000);
    </script>
</body>
</html>
