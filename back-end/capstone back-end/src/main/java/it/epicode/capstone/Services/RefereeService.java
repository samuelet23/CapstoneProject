package it.epicode.capstone.Services;

import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Models.DTO.RefereeDTO;
import it.epicode.capstone.Models.Entities.Referee;
import it.epicode.capstone.Models.Enums.RoleInTheGame;
import it.epicode.capstone.Repositories.RefereeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
public class RefereeService {

    @Autowired
    private RefereeRepository refereeRp;

    public List<Referee> getAll(){
        return refereeRp.findAll();
    }
    public Referee getById(UUID id)throws BadRequestException{
        return refereeRp.findById(id).orElseThrow(
                () -> new BadRequestException("Referee with id: "+id+" Not Found")
        );
    }
    public Referee getByNickname(String nickname)throws BadRequestException{
        return refereeRp.findByNickname(nickname).orElseThrow(
                () -> new BadRequestException("Referee with nickname: "+nickname+" Not Found")
        );
    }
    public List<Referee> getAllRefereeFromTournament(String name){
        return refereeRp.findByTournamentName(name);
    }
    public Referee createReferee(RefereeDTO refereeDTO) throws BadRequestException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        Referee r = new Referee();
        r.setName(refereeDTO.name());
        r.setNickname(refereeDTO.nickname());
        r.setSurname(refereeDTO.surname());
        r.setDateOfBirth(LocalDate.parse(refereeDTO.dateOfBirth(), formatter));
        if (!isOverEighteen(LocalDate.parse(refereeDTO.dateOfBirth(), formatter))) {
            throw new BadRequestException("L'arbitro deve essere maggiorenne");
        }
        r.setAge(calculateAge(r.getDateOfBirth()));
        r.setRole(RoleInTheGame.REFEREE);
        return refereeRp.save(r);
    }
    public void updateById(UUID id, RefereeDTO refereeDTO)throws BadRequestException{
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        Referee r = getById(id);
        r.setName(refereeDTO.name());
        r.setSurname(refereeDTO.surname());
        r.setSurname(refereeDTO.surname());
        r.setDateOfBirth(LocalDate.parse(refereeDTO.dateOfBirth(), formatter));
        if (!isOverEighteen(LocalDate.parse(refereeDTO.dateOfBirth(), formatter))) {
            throw new BadRequestException("L'arbitro deve essere maggiorenne");
        }
        r.setAge(calculateAge(r.getDateOfBirth()));
        refereeRp.save(r);
    }
    public void updateByNickname(String nickname, RefereeDTO refereeDTO)throws BadRequestException{
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        Referee r = getByNickname(nickname);
        r.setName(refereeDTO.name());
        r.setSurname(refereeDTO.surname());
        r.setSurname(refereeDTO.surname());
        r.setDateOfBirth(LocalDate.parse(refereeDTO.dateOfBirth(), formatter));
        if (!isOverEighteen(LocalDate.parse(refereeDTO.dateOfBirth(), formatter))) {
            throw new BadRequestException("L'arbitro deve essere maggiorenne");
        }
        r.setAge(calculateAge(r.getDateOfBirth()));
        refereeRp.save(r);
    }

    public void deleteById(UUID id)throws BadRequestException{
        Referee r = getById(id);
        refereeRp.delete(r);
    }
    public void deleteByNickname(String nickname)throws BadRequestException{
        Referee r = getByNickname(nickname);
        refereeRp.delete(r);
    }



    private static boolean isOverEighteen(LocalDate dateOfBirth) {
        LocalDate currentDate = LocalDate.now();
        Period period = Period.between(dateOfBirth, currentDate);
        int age = period.getYears();
        return age > 18;
    }
    private static int calculateAge(LocalDate dateOfBirth) {
        LocalDate currentDate = LocalDate.now();
        Period period = Period.between(dateOfBirth, currentDate);
        return period.getYears();
    }
}
