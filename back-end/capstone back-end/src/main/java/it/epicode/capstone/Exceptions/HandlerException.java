package it.epicode.capstone.Exceptions;

import jakarta.mail.MessagingException;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindingResult;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;

@RestControllerAdvice
public class HandlerException {

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse notFoundExceptionHandler(NotFoundException e) {
        return new ErrorResponse(HttpStatus.NOT_FOUND, "Not found", e.getMessage());
    }

    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse badRequestHandler(BadRequestException e) {
        return new ErrorResponse(HttpStatus.BAD_REQUEST, "Bad request", e.getMessage());
    }

    @ExceptionHandler(InternalServerErrorException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse badRequestHandler(InternalServerErrorException e) {
        return handlerException(e);
    }

    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse notFoundHandler(UnauthorizedException e) {
        return new ErrorResponse(HttpStatus.UNAUTHORIZED, "Unauthorized", e.getMessage());
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handlerException(Exception e) {
        return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", e.getMessage());
    }
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public ErrorResponse handlerException(HttpRequestMethodNotSupportedException e) {
        return new ErrorResponse(HttpStatus.METHOD_NOT_ALLOWED, "Method not allowed", e.getMessage());
    }
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(AccessDeniedException.class)
    public ErrorResponse accessDeniedHandler(AccessDeniedException e) {
        return new ErrorResponse(HttpStatus.UNAUTHORIZED,
                "Unauthorized", "You don't have permissions to access this resource");
    }
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(TournamentNotReadyException.class)
    public ErrorResponse tournamentNotReadyHandler(TournamentNotReadyException e) {
        return new ErrorResponse(HttpStatus.BAD_REQUEST,
                "Tournament Not Ready", "The tournament is not ready to proceed to the next round");
    }
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(TournamentDataException.class)
    public ErrorResponse tournamentDataHandler(TournamentDataException e) {
        return new ErrorResponse(HttpStatus.BAD_REQUEST,
                "ERROR:", "Error in handling tournament data: " + e.getMessage());
    }
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(NoTournamentsAvailableException.class)
    public ErrorResponse noTournamentAvailableHandler(NoTournamentsAvailableException e) {
        return new ErrorResponse(HttpStatus.BAD_REQUEST,
                "ERROR:", "no tournament available after this date: " + e.getMessage());
    }
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MessagingException.class)
    public ErrorResponse messagingHandler(MessagingException e) {
        return new ErrorResponse(HttpStatus.BAD_REQUEST,"ERROR:", e.getMessage());
    }






    public static void noTournamentAvailableException(BindingResult bindingResult) throws NoTournamentsAvailableException {
        if (bindingResult.hasErrors()) {
            throw new NoTournamentsAvailableException(bindingResult.getAllErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList()
                    .toString());
        }
    }
    public static void tournamentNotReadyException(BindingResult bindingResult) throws TournamentNotReadyException {
        if (bindingResult.hasErrors()) {
            throw new TournamentNotReadyException(bindingResult.getAllErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList()
                    .toString());
        }
    }
    public static void internalServerErrorException(BindingResult bindingResult) throws InternalServerErrorException {
        if (bindingResult.hasErrors()) {
            throw new InternalServerErrorException(bindingResult.getAllErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList()
                    .toString());
        }
    }
    public static void illegalArgumentException(BindingResult bindingResult)  {
        if (bindingResult.hasErrors()) {
            throw new IllegalArgumentException(bindingResult.getAllErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList()
                    .toString());
        }
    }
    public static void unathorizedException(BindingResult bindingResult) throws UnauthorizedException {
        if (bindingResult.hasErrors()) {
            throw new UnauthorizedException(bindingResult.getAllErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList()
                    .toString());
        }
    }
    public static void ioException(BindingResult bindingResult) throws IOException {
        if (bindingResult.hasErrors()) {
            throw new IOException(bindingResult.getAllErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList()
                    .toString());
        }
    }
    public static void tournamentDataException(BindingResult bindingResult) throws TournamentDataException {
        if (bindingResult.hasErrors()) {
            throw new TournamentDataException(bindingResult.getAllErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList()
                    .toString());
        }
    }
    public static void exception(BindingResult bindingResult) throws BadRequestException {
        if (bindingResult.hasErrors()) {
            throw new BadRequestException(bindingResult.getAllErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList()
                    .toString());
        }
    }
    public static void notFoundException(BindingResult bindingResult) throws NotFoundException {
        if (bindingResult.hasErrors()) {
            throw new NotFoundException(bindingResult.getAllErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList()
                    .toString());
        }
    }
    public static void badRequestException(BindingResult bindingResult) throws BadRequestException {
        if (bindingResult.hasErrors()) {
            throw new BadRequestException(bindingResult.getAllErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList()
                    .toString());
        }
    }

}
