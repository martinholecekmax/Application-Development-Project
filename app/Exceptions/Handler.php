<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        if ($exception instanceof TokenInvalidException) {
            return response()->json(['error' => 'Token is invalid!'], 400);
        } else if ($exception instanceof TokenExpiredException) {
            return response()->json(['error' => 'Token is Expired!'], 400);
        } else if ($exception instanceof JWTException) {
            return response()->json(['error' => 'Token not provided!'], 400);
        } else if ($exception instanceof MethodNotAllowedHttpException) {
            // Method is not correct - ex. POST instead of GET ...
            return response()->json(['error' => 'Method is not Allowed!'], 400);
        } else if ($exception instanceof NotFoundHttpException) {
            // If route (URL) is not valid
            return response()->json(['error' => 'Page Not Found!'], 404);
        } else if ($exception instanceof ModelNotFoundException) {
            // If the model is not in database
            return response()->json(['error' => 'Model not found!'], 404);
        } else {
           // return response()->json(['error' => 'Internal Server Error!'], 500);
        }
        return parent::render($request, $exception); // Used only for websites
    }
}
