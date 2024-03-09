package it.epicode.capstone.Services;

import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Models.DTO.RefereeDTO;
import it.epicode.capstone.Models.Entities.Referee;
import it.epicode.capstone.Models.Enums.Role;
import it.epicode.capstone.Models.Enums.RoleInTheGame;
import it.epicode.capstone.Repositories.RefereeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
    public Referee getByName(String name)throws BadRequestException{
        return refereeRp.findByName(name).orElseThrow(
                () -> new BadRequestException("Referee with name: "+name+" Not Found")
        );
    }
    public List<Referee> getAllRefereeFromTournament(String name){
        return refereeRp.findByTournamentName(name);
    }
    public Referee createReferee(RefereeDTO refereeDTO){
        Referee r = new Referee();
        r.setName(refereeDTO.name());
        r.setSurname(refereeDTO.surname());
        r.setDateOfBirth(LocalDate.parse(refereeDTO.dateOfBirth()));
        r.setRole(RoleInTheGame.REFEREE);
        return refereeRp.save(r);
    }
    public Referee update(UUID id, RefereeDTO refereeDTO)throws BadRequestException{
        Referee r = getById(id);
        r.setName(refereeDTO.name());
        r.setSurname(refereeDTO.surname());
        r.setDateOfBirth(LocalDate.parse(refereeDTO.dateOfBirth()));

        return refereeRp.save(r);
    }

    public void deleteById(UUID id)throws BadRequestException{
        Referee r = getById(id);
        refereeRp.delete(r);
    }
    public void deleteByName(String name)throws BadRequestException{
        Referee r = getByName(name);
        refereeRp.delete(r);
    }


}
